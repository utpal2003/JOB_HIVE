import React from 'react'
import './Notfound.css'

const NotFound = () => {
  return (
    // <section className='page notfound'>
    //     <div id="content">
    //       <img src="/page not found.jpg" alt="notfound" className='photo'/>
    //       <Link to={"/"} className='rethome'>RETURN TO HOME</Link>
    //     </div>
    // </section>
    <section className='concept_Notfound'>
    <div className="container_Notfound">
            <div className="content_Notfound">
                <img src="/page not found.jpg"  alt="Page Not Found" />
                <h1>404</h1>
                <p>Oops! The page you are looking for does not exist.</p>
                <a href="/">Go Back Home</a>
            </div>
        </div>
        </section>
  )
}

export default NotFound