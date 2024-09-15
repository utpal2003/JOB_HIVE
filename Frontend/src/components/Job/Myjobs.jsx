// import React, { useEffect, useState, useContext } from 'react'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { FaCheck } from 'react-icons/fa6'
// import { RxCross2 } from 'react-icons/rx'
// import { Context } from '../../main'
// import { useNavigate } from 'react-router-dom'
// // import { jobpostportal } from '../../../../Backend/models/jobschema'

// const MyJobs = () => {
//   const [myJobs, setMyJobs] = useState([]);
//   const [editingMode, setEditingMode] = useState(null);
//   const { isAuthorized, user } = useContext(Context);
//   const navigateTo = useNavigate();


//   //fetchinf all jobs of an employer-----------------------------------
//   useEffect(() => {
//     if (!isAuthorized || (user && user.role !== "Employee")) {
//       navigateTo("/");
//     }
//     const fetchJobs = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/alljobs/getmyJobs",
//           { withCreadentials: true }
//         );
//         setMyJobs(data.myjobs);
//       } catch (error) {
//         toast.error(error.response.data.message);
//         setMyJobs([]);
//       }
//     };

//     fetchJobs();
//   }, [isAuthorized, user, navigateTo]);




//   //function for enabling Editing Mode
//   const handleEnableEdit = (jobId) => {
//     setEditingMode(jobId);
//   }

//   //function for disabling Editing Mode
//   const handleDisableEdit = (jobId) => {
//     setEditingMode(jobId);
//   }

//   //function for editing job
//   const handleUpdatejob = async (jobId) => {
//     const updatejob = myJobs.find((job) => job._id === jobId);
//     await axios
//       .put(`http://localhost:4000/api/v1/alljobs/updatejob/${jobId}`, updatejob, {
//         withCreadentials: true
//       })
//       .then(res => {
//         toast.success(res.data.message);
//         setEditingMode(null);
//       })
//       .catch(error => {
//         toast.error(error.responce.data.messsage);

//       });
//   };

//   //function for deletingf job
//   const handleJobDelete = async (jobId) => {
//     await axios
//       .delete(`http://localhost:4000/api/v1/alljobs/deletejob/${jobId}`, {
//         withcredentials: true,
//       })
//       .then(res => {
//         toast.success(res.data.message);
//         setMyJobs(prevJobs => prevJobs.filter(job => job._id !== jobId))
//       })
//       .catch(error => [toast.error(error.responce.data.message)]);
//   };

//   const handleInputChange = (jobId, field, value) => {
//     setMyJobs((prevJob) =>
//       prevJob.map((job) =>
//         job._id === jobId ? { ...job, [field]: value } : job
//       )
//     );
//   };

//   return (
//     <>

//       <div className="myJobs page">
//         <div className="container">
//           <h3>Your posted job</h3>
//           {
//             myJobs && myJobs.length > 0 ? (
//               <>
//                 <div className="banner">
//                   {
//                     myJobs.map(element => {
//                       return (
//                         <div className="card" key={element._id}>
//                           <div className="content">
//                             <div className="short-fields">
//                               <div>
//                                 <span>Title: </span>
//                                 <input
//                                   type="text"
//                                   disabled={editingMode !== element._id ? true : false
//                                   }
//                                   value={element.tittle}
//                                   onChange={(e) =>
//                                     handleInputChange
//                                       (element._id,
//                                         "tittle",
//                                         e.target.value
//                                       )
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <span>Country: </span>
//                                 <input
//                                   type="text"
//                                   disabled={editingMode !== element._id ? true : false
//                                   }
//                                   value={element.country}
//                                   onChange={(e) =>
//                                     handleInputChange
//                                       (element._id,
//                                         "country",
//                                         e.target.value
//                                       )
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <span>City: </span>
//                                 <input
//                                   type="text"
//                                   disabled={
//                                     editingMode !== element._id ? true : false
//                                   }
//                                   value={element.city}
//                                   onChange={(e) =>
//                                     handleInputChange
//                                       (element._id,
//                                         "City",
//                                         e.target.value
//                                       )
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <span>Category: </span>
//                                 <select
//                                   value={element.category}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       element.id,
//                                       "category",
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={
//                                     editingMode !== element._id ? true : false
//                                   }
//                                 >

//                                   <option value="">
//                                     Select Category
//                                   </option>
//                                   <option value="Graphics & Design">
//                                     Graphics & Design
//                                   </option>
//                                   <option value="Mobile App Development">
//                                     Mobile App Development
//                                   </option>
//                                   <option value="Frontend Web Development">
//                                     Frontend Web Development
//                                   </option>
//                                   <option value="MERN Stack Development">
//                                     MERN Stack Development
//                                   </option>
//                                   <option value="Account & Finance">
//                                     Account & Finance
//                                   </option>
//                                   <option value="Artificial Intelligence">
//                                     Artificial Intelligence
//                                   </option>
//                                   <option value="Video Animation">
//                                     Video Animation
//                                   </option>
//                                   <option value="MEAN Stack Development">
//                                     MEAN Stack Development
//                                   </option>
//                                   <option value="Data Entry Operator">
//                                     Data Entry Operator
//                                   </option>


//                                 </select>
//                               </div>
//                               <div>

//                                 <span>Salary:{""}
//                                   {
//                                     element.fixedsalary ? (
//                                       <input type=
//                                         "number"
//                                         value={element.fixedSalary}
//                                         onChange={(e) =>
//                                           handleInputChange(
//                                             element.id,
//                                             "fixedsalary",
//                                             e.target.value
//                                           )
//                                         }
//                                         disabled={
//                                           editingMode !== element._id ? true : false
//                                         }
//                                       />
//                                     ) : (
//                                       <div>
//                                         <input type=
//                                           "number"
//                                           value={element.salaryFrom}
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               element.id,
//                                               "salaryFrom",
//                                               e.target.value
//                                             )
//                                           }
//                                           disabled={
//                                             editingMode !== element._id ? true : false
//                                           }
//                                         />
//                                         <input type=
//                                           "number"
//                                           value={element.salaryTo}
//                                           onChange={(e) =>
//                                             handleInputChange(
//                                               element.id,
//                                               "salaryTo",
//                                               e.target.value
//                                             )
//                                           }
//                                           disabled={
//                                             editingMode !== element._id ? true : false
//                                           }
//                                         />
//                                       </div>
//                                     )}
//                                 </span>
//                               </div>
//                               <div>
//                                 <span>Expired:</span>
//                                 <select
//                                   value={element.expire}
//                                   onChange={(e) =>
//                                     handleInputChange(
//                                       element.id,
//                                       "expire",
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={
//                                     editingMode !== element._id ? true : false
//                                   }
//                                 >
//                                   <option value={true}>TRUE</option>
//                                   <option value={false}>FALSE</option>
//                                 </select>
//                               </div>
//                             </div>
//                             <div className="long_field">
//                               <div>
//                                 <span>Description:</span>
//                                 <textarea rows="5" value={element.description} onChange={(e) =>
//                                   handleInputChange(
//                                     element.id,
//                                     "description",
//                                     e.target.value
//                                   )
//                                 }
//                                   disabled={
//                                     editingMode !== element._id ? true : false
//                                   }
//                                 />
//                               </div>
//                               <div>
//                                 <span>Location:</span>
//                                 <textarea rows="5" value={element.location} onChange={(e) =>
//                                   handleInputChange(
//                                     element.id,
//                                     "location",
//                                     e.target.value
//                                   )
//                                 }
//                                   disabled={
//                                     editingMode !== element._id ? true : false
//                                   }
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="button wrapper">
//                             <div className="edit_btn_wrapper">
//                               {
//                                 editingMode === element._id ? (
//                                   <>
//                                     <button
//                                       on onClick={() => handleUpdatejob(element._id)}
//                                       className="check_btn"
//                                     >
//                                       <FaCheck />
//                                     </button>
//                                     <button
//                                       on onClick={() => handleDisableEdit(element._id)}
//                                       className="cross_btn"
//                                     >
//                                       <RxCross2 />
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <button
//                                     onClick={() => handleEnableEdit(element._id)}
//                                     className="edit_btn"

//                                   >
//                                     Edit
//                                   </button>
//                                 )}
//                             </div>
//                             <button onClick={() => handleJobDelete(element._id)} className="delete_btn">
//                               Delete
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                 </div>
//               </>
//             ) : (
//               <p>
//                 Sorry.... You have not posted any job or may be you delete all of your jobs!
//               </p>
//             )}
//         </div>
//       </div>

//     </>
//   );
// };

// export default MyJobs
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/alljobs/getmyJobs",
          { withCredentials: true }
        );
        setMyJobs(data.myjobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  // if (!isAuthorized || (user && user.role !== "Employer")) {
  //   navigateTo("/");
  // }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/alljobs/updatejob/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    const value = confirm("Are you sure you want to delete your job? ");
    if(value){
    await axios
      .delete(`http://localhost:4000/api/v1/alljobs/deletejob/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    }
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1>Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.tittle}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "tittle",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                            <option value="Others">
                              Others
                            </option>
                          </select>
                        </div>
                        <div>
                          <span>
                            Salary:{" "}
                            {element.fixedsalary ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedsalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedsalary",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          {" "}
                          <span>Expired:</span>
                          <select
                            value={element.expire}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expire",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;