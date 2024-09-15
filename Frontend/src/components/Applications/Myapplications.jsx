import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [application, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employee") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.application);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.application);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  // const deleteApplication = (id) => {

  //   const value = confirm("Do you want to Delet your application?");
  //   if (value) {
  //     try {
  //       axios
  //         .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
  //           withCredentials: true,
  //         })
  //         .then((res) => {
  //           toast.success(res.data.message);
  //           setApplications((prevApplication) =>
  //             prevApplication.filter((application) => application._id !== id)
  //           );
  //         });
  //     } catch (error) {
  //       toast.error(error.response.data.message);
  //     }
  //   }
  // };

  
  const deleteApplication = async (id) => {
    const value = confirm("Do you want to delete your application?");
    if (value) {
      try {
        const res = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        });
        toast.success(res.data.message);
        setApplications((prevApplication) =>
          prevApplication.filter((application) => application._id !== id)
        );
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          toast.error(error.response.data.message);
        } else if (error.request) {
          // Request was made but no response received
          toast.error("No response from server.");
        } else {
          // Something else happened in setting up the request
          toast.error("Error: " + error.message);
        }
      }
    }
  };
  

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "job seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {application.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            application.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {application.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            application.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverletter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverletter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};