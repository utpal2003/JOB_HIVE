import React from 'react'
import { FaApple, FaMicrosoft } from 'react-icons/fa'
import { SiTesla } from 'react-icons/si'

const Popularcompany = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Salt Lake Sector V, Kolkata",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Salt Lake Sector V, Kolkata",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Salt Lake Sector V, Kolkata",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <>
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {
            companies.map(element=>{
              return(
                <div className="card" key={element.id}>
                  <div className="content">
                    <div className="icon">{element.icon}</div>
                    <div className="text">
                      <p>{element.title}</p>
                      <p>{element.location}</p>
                    </div>
                  </div>
                  <button>Open Positions {element.openPositions}</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default Popularcompany