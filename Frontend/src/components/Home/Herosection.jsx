import React from 'react'
import { FaBuilding, FaSuitcase, FaUserPlus, FaUsers } from 'react-icons/fa'
const Herosection = () => {
    const details = [
        {
          id: 1,
        title: "1,23,441",
        subTitle: "Live Job",
        icon: <FaSuitcase />,
        },
        {
          id: 2,
          title: "91220",
          subTitle: "Companies",
          icon: <FaBuilding />,
        },
        {
          id: 3,
          title: "2,34,200",
          subTitle: "Job Seekers",
          icon: <FaUsers />,
        },
        {
          id: 4,
          title: "1,03,761",
          subTitle: "Employers",
          icon: <FaUserPlus />,
        }
      ];
  return (
    <div className='heroSection'>
    <div className="container">
      <div className="title">
        <h1>Find a job that suits</h1>
        <h1>your interest and skills</h1>
        <p>
        Finding a job that interests you involves a thoughtful approach. Start by assessing your interests, skills, and values to understand what kind of work will fulfill you. Research various industries and job roles that align with these aspects. Networking is crucial; connect with professionals in your desired field through LinkedIn and industry events. Use job boards and company websites to find opportunities that match your criteria. Tailor your resume and cover letter for each application to highlight your relevant experiences.
        </p>
      </div>

      <div className="image herosectionimage">
        <img src="/Herosection photo.jpg" alt="hero" />
      </div>
    </div>
    
    <div className="details">
      {
      details.map(element =>{
        return(
          <div className="card" key={element.id}>
            <div className="icon">{element.icon}</div>
            <div className="content">
              <p>{element.title}</p>
              <p>{element.subTitle}</p>
            </div>
          </div>
        )
      })
    }
    </div>
  </div>
)
}


export default Herosection