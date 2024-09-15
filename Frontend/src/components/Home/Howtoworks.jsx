import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { MdFindInPage } from 'react-icons/md'

const Howtoworks = () => {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>How JobHive Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>Create your account to access thousands of job listings and find your perfect match.Sign up today to receive personalized job recommendations and alerts.Join our community to apply for jobs quickly and track your applications effortlessly.Register now to connect with top employers and advance your career.Start your job search journey with us by creating an account for exclusive features and insights.
              .Sign up now to enjoy a streamlined job search experience with advanced tools and resources.
            </p>
          </div>

          <div className="card">
            <MdFindInPage />
            <p>Find a Job / Post a Job</p>
            <p>Finding a job starts with identifying your interests and researching industries and roles that match your skills and values. Network with professionals in your desired field and utilize job boards and company websites for opportunities. 
            Posting a job involves clearly defining the role, responsibilities, and required qualifications. Write a detailed job description that highlights key aspects and appeals to potential candidates.</p>
          </div>

          <div className="card">
            <IoMdSend />
            <p>Create Account</p>
            <p>Creating an account to access all features on a website is easy. Start by navigating to the website and finding the "Sign Up" or "signup" button, usually located at the top right corner. Click on this button and fill in the required details, such as your name, email address, and a secure password..</p>
          </div>

        </div>
      </div>

    </div>
  )
}


export default Howtoworks