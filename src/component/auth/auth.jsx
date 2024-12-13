import React, { useEffect, useState } from 'react'
import './auth.css'

import '../../assets/fontawesome-free-6.6.0-web/css/all.css'

import { useLocation } from "react-router-dom";

import { Link,Outlet} from 'react-router-dom'


export default function Auth() {
    const location = useLocation();
console.log(location.pathname)
    const[path,setpath]=useState(null)
useEffect(()=>{
 if(location.pathname === "/auth/auth/login"){
   
   setpath("Se Connecter")
}
if(location.pathname === "/auth/auth/Register"){
   
    setpath("S'inscrire")
 }else(
   console.log('')
)
   
},[location.pathname])

  return (
    <div>
    <div id="Header">
        <div >
            <p>
                <Link to={"auth/login"}>Se Connecter</Link>
            </p>
        </div>
        <div>
            <p>
                <Link to={"auth/Register"}> S'inscrire</Link>
            </p>
        </div>
    </div>

    <div id="isicon">
    <i className="fa-solid fa-user"></i>
  
    </div>

    <div id="pathTrame">
    <p>
        {path}
    </p>
  </div>
    <div id="corpAuth">

        <Outlet/>
    </div>
    </div>
  )
}
