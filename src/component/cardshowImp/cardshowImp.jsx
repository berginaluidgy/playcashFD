import './cardshowImp.css'
import React,{useState,useRef, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND'
export default function CardshowImp() {
  const[data,setdata]=useState(useState(null))
  const token = localStorage.getItem("token");
  if (!token) {
   console.log( 'Token non trouve')
   return;
  }

  const decodeToken = (token) => {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  const decodedToken = decodeToken(token);
  const userId = decodedToken.user_id;
  console.log(userId)
  useEffect(()=>{
axios.get(DOMAINBACKEND+'/ask-didicel/'+userId)
.then(res=>{
  console.log(res)
  setdata(res.data)
})
  },[])
  return (
    <div id='reachCard'>
        <TelecomLogos  />
       
        <p>{data.video_count}</p>
      
        {/* {data.can_request ?(<div id="request">
          
            <div id='txt'><p>Recoit des recharges DIGICEL tous les jours</p></div>
<div id='clickBUTTON'><p>Demander</p></div> 

</div>):(<div id='txt'> <p>Regarder 60 videos Pour recevoir des minutes DIGICEL /NATCOM . NBRS LUES :{data.video_count} VIDEOS</p>  </div>) }
   
    */}
    <Quetes/> 
    </div>
  )
}

import { color, motion } from "framer-motion";
import Quetes from '../navigation/page/quetes';

const TelecomLogos = () => {
 
  

  return (
   
<LuckyDraw/>
 
  );
};










// Composant principal
const LuckyDraw = () => {

  const navigate = useNavigate();
  function onclcik(){
    navigate('/tiraj');
  }
  const mascotImageUrl =
    "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"; // URL d'une image de mascotte noire contente (vous pouvez la remplacer par une autre)

  const containerStyle = {
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
   Height: "70px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
  };

  const headerStyle = {
    fontSize: "17px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "red",
  };

  const prizeStyle = {
    fontSize: "23px",
    fontWeight: "500",
    color: "#fff",
    marginBottom: "1.5rem",
  };

  const mascotStyle = {
    width: "50px",
    height: "50px",
    margin: "10px 0",
    borderRadius: "50%",
    border: "4px solid red",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
  };

  const footerStyle = {
    fontSize: "1.2rem",
    fontWeight: "400",
    marginTop: "15px",
    color: "#d3d3d3",
  };

  

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>🎉 Tirage Hebdomadaire 🎉</h1>
      <p style={prizeStyle}>
        Gagnez <span style={{ color: "red", fontWeight: "bold" }}>2500 Gourdes</span> en
        minutes DIGICEL et NATCOM !
      </p>
    
      <p style={footerStyle}>
        Le tirage se fait chaque semaine. !
          <img
        src={mascotImageUrl}
        alt="Mascotte heureuse"
        style={mascotStyle}
      />
         <div id="position" onClick={onclcik}><p>Voir votre Position dans le tirage</p></div>
      </p>
    </div>
  );
};


