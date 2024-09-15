import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import {FaFacebookF, FaYoutube, FaLinkedin} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'

const Footer = () => {
  const {isAuthorized} = useContext(Context);
  return (
   <footer className={isAuthorized ? "footerShow" : "footerHide"}>
    <div>&copy; All Rights Reserved By ..... </div>
    <div>
      <Link to={'/'} target="_blank" className='footericon'><FaFacebookF/></Link>
      <Link to={'/'} target="_blank" className='footericon'><FaLinkedin/></Link>
      <Link to={'/'} target="_blank" className='footericon'><FaYoutube/></Link>
      <Link to={'https://www.instagram.com/'} target="_blank" className='footericon'><RiInstagramFill/></Link>
    </div>
   </footer>
  );
};

export default Footer