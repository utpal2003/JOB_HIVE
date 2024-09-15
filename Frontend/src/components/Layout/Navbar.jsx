
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    const value = confirm("Do you want to Logout?");
    if (value) {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/logout", { withCredentials: true });
        toast.success(response.data.message);
        setIsAuthorized(false);
        navigateTo('/login');
      } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthorized(true);
      }
    }
  };

  const handleLogin = () => {
    navigateTo('/login');
  };

  return (
    <>
      <nav className="navbarshow">
        <div className="container">
          <div className="logo">
            <img src="/final_logo.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
            {isAuthorized ? (
              <>
                <li>
                  <Link to={"/application/me"} onClick={() => setShow(false)}>
                    {user && user.role === "Employee" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
                  </Link>
                </li>
                {user && user.role === "Employee" && (
                  <>
                    <li>
                      <Link to={'/job/post'} onClick={() => setShow(false)}>
                        POST NEW JOB
                      </Link>
                    </li>
                    <li>
                      <Link to={'/job/me'} onClick={() => setShow(false)}>
                        VIEW YOUR JOBS
                      </Link>
                    </li>
                  </>
                )}
                <button onClick={handleLogout}>LOGOUT</button>
              </>
            ) : (
              <button onClick={handleLogin}>LOGIN</button>
            )}
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
