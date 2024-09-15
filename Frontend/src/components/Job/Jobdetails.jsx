import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';

const Jobdetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/alljobs/${id}`, { withCredentials: true, }).then(res => {
      setJob(res.data.job)
    }).catch(err => {
      console.log(err.response.data.message);
    });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }
  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title: <span>{job.tittle}</span>
            </p>
            <p>
              Category: <span>{job.category}</span>
            </p>
            <p>
              Country: <span>{job.country}</span>
            </p>
            <p>
              City: <span>{job.city}</span>
            </p>
            <p>
              Location: <span>{job.location}</span>
            </p>
            <p>
              Description: <span>{job.description}</span>
            </p>
            <p>
              Job Posted On: <span>{job.jobpostdate}</span>
            </p>

            <p>
              Salary: {job.fixedsalary ? (<span>{job.fixedsalary}</span>) : (<span>
                {job.salaryFrom} - {job.salaryTo}</span>)}
            </p>
            <p>
              {
                user && user.role === "Employee" ? (<></>) :
                  (<Link to={`/application/${job._id}`}>Apply Now</Link>
                  )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


export default Jobdetails