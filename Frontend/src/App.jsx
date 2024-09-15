import React, {useEffect, useContext}from 'react'
import './App.css'
import { Context } from './main'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import Jobdetails from './components/Job/Jobdetails'
import MyJobs from './components/Job/Myjobs'
import PostJobs from './components/Job/Postjobs'
import Application from  './components/Applications/Application'
import MyApplications from './components/Applications/Myapplications'
import NotFound from './components/Notfoundpage/Notfound'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'


const App = () => {

  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context);

  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getUser", {withCredentials: true});
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
  // ---- chat gpt code---------
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/api/v1/user/getUser", { withCredentials: true });
  //       setUser(response.data.user);
  //       setIsAuthorized(true);
  //     } catch (error) {
  //       setIsAuthorized(false);
  //       console.error("Error fetching user:", error);
  //     }
  //   };
  //   fetchUser();
  // }, [isAuthorized, setIsAuthorized, setUser]);

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/job/getall" element={<Jobs/>}/>
        <Route path="/job/:id" element={<Jobdetails/>}/>
        <Route path="/job/post" element={<PostJobs/>}/>
        <Route path="/job/me" element={<MyJobs/>}/>
        <Route path="/application/:id" element={<Application/>}/>
        <Route path="/application/me" element={<MyApplications/>}/>
        <Route path="*" element={<NotFound/>}/>  
      </Routes>
      <Footer />
      <Toaster />
    </Router>
    </>
  )
}

export default App