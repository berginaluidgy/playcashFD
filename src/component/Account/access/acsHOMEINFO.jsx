import React ,{useEffect, useState}from 'react'
import Authconfirmator from '../../Auth.confirmator'
import axios from 'axios'
import DOMAINBACKEND from '../../GLOBALVAR/DOMAINBACKEND'

export default function acsHOMEINFO() {
    const [dt,setdt]=useState({})
    useEffect(() => {
    if(Authconfirmator()){
        const decodeToken = (token) => {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    };
    
    const Token = localStorage.getItem("token");
    const decodedToken = decodeToken(Token);
    console.log(decodedToken);
    const Capture=decodedToken.user_id;
    console.log(Capture)

    axios.get(DOMAINBACKEND+'/ACCESS/'+Capture)
    .then(res=>{
        console.log(res.data.data)
       setdt(res.data.data)
    })
    .catch(
       error=>console.error(error)
       
    )
  
  }
  }, []);
//   return
return(dt)
}
