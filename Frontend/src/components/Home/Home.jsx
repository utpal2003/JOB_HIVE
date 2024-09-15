import React, { useContext } from 'react'
import {Context} from '../../main'
import { Navigate } from 'react-router-dom';

// import Popularcompany from "./Popularcompany";
import Herosection from './Herosection'
import Howtoworks from './Howtoworks'
import Popularcatgories from './Popularcatgories'
import Popularcompany from './Popularcompany'


const Home = () => {
  // const {isAuthorized} = useContext(Context);
  // if(!isAuthorized){
  //   return <Navigate to= {'/login'} />
  // }
  return (
    <section className="homePage page">
    <Herosection/>
    <Howtoworks/>
    <Popularcatgories/>
    <Popularcompany/>
     
    </section>
  )
}

export default Home