import React, { useEffect, useState } from 'react'
import './header.css'
import { useNavigate } from "react-router-dom";
import '../../assets/fontawesome-free-6.6.0-web/css/all.css'
import Authconfirmator from '../Auth.confirmator';
import acsHOMEINFO from '../Account/access/acsHOMEINFO';

export default function Header() {
  const navigate = useNavigate();
  const [islogg ,setislogg]=useState("S'authentifier")
  const [infoo1 ,setinfoo1]=useState({})
  const key = "token";
  const infoo=acsHOMEINFO().firstdegree;
  console.log(acsHOMEINFO().firstdegree,)
  useEffect(()=>{
    console.log(Authconfirmator())
    if (Authconfirmator() === true && infoo) {
      setislogg(infoo.Money + " HTG");
    }
      else{
  setislogg(("S'authentifier"))
}
  },[Authconfirmator(),infoo])

  const handleClick = () => {
    const token = localStorage.getItem("token");

if (token) {
  console.log("Token exists:", token);
  navigate("User/Account/pay"); 
} else {
  navigate("auth"); 
  console.log("No token found.");
}
   // Navigue vers "/about"
  }
  const handleClick2 = () => {
    const token = localStorage.getItem("token");

if (token) {
  console.log("Token exists:", token);
  navigate("User/Account/X2"); 
} else {
  navigate("auth"); 
  console.log("No token found.");
}
   // Navigue vers "/about"
  }
  const handleClickHOME = () => {
    const token = localStorage.getItem("token");

if (token) {
  console.log("Token exists:", token);
  navigate("/views"); 
} else {
  navigate("auth"); 
  console.log("No token found.");
}
   // Navigue vers "/about"
  }

  const token = localStorage.getItem("token");
  return (
    <div id='header'>
<div id="logo"><div onClick={handleClickHOME} ><i className="fa-solid fa-dollar-sign"></i><i className="fa-solid fa-play"></i></div></div>
<div id="account"><div onClick={handleClick}><i className="fa-solid fa-user"></i></div></div>
<div id="accountAUTH" onClick={handleClick2} ><div >{islogg}</div>
{token?(<div id="retr">
  <p>Retrait</p><i class="fa-solid fa-arrows-turn-right"></i>
</div>):(<div></div>)}</div>
    </div>
  )
}
