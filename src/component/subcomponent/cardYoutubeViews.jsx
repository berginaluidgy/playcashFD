import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./cardYoutubeViews.css";
import axios from "axios";
import acsHOMEINFO from '../Account/access/acsHOMEINFO'
import Authconfirmator from "../Auth.confirmator";
import DOMAINBACKEND from "../GLOBALVAR/DOMAINBACKEND";
import addpoint from "../rank/addpoint";
// import acsHOMEINFO from './Account/access/acsHOMEINFO.jsx'

export default function CardYoutubeViews({ data }) {
  console.log(data)
  const [rewardMessage, setRewardMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isaclick, setIsaclick] = useState(false);
  const [placeshare, setplaceShare] = useState('');
  const [infos,setinfo] = useState(null);
  useEffect(()=>{
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
     setinfo(res.data.data)
  })
  .catch(
     error=>console.error(error)
     
  )

}

  },[infos])


  // Gestion du changement de visibilité (changement d'onglet)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);

      if (document.hidden && isaclick) {
        localStorage.setItem("db", Date.now());
        console.log("Page cachée : db mis à jour.");
      } else if (!document.hidden && isaclick) {
        localStorage.setItem("fn", Date.now());
        console.log("Page visible : fn mis à jour.");

        const fn = parseInt(localStorage.getItem("fn"), 10);
        const db = parseInt(localStorage.getItem("db"), 10);
        const difference = fn - db;
        console.log(`Différence : ${difference} ms`,(difference/1000)/60 +'  minutes');
         setIsaclick(false);
         if (!Authconfirmator()) {
          alert("Connectez-vous pour participer.");
          return;
        }
          if(((difference/1000)/60)>=2){
            console.log(2,difference)
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                  alert("Token non trouvé. Veuillez vous connecter.");
                  return;
                }
          
                const decodeToken = (token) => {
                  const payload = token.split(".")[1];
                  return JSON.parse(atob(payload));
                };
          
                const decodedToken = decodeToken(token);
                const userId = decodedToken.user_id;
                console.log(userId)
                const fn = parseInt(localStorage.getItem("fn"), 10);
                const db = parseInt(localStorage.getItem("db"), 10);
                const difference = fn - db;
                console.log(data.id)
                const response =  axios.post(DOMAINBACKEND+"/checkAndacceptVIEWS/", {
                  idVideo: data.id,
                  Userid: userId,
                  video_title:data.title,
                  video_url:data.videoID,
                  dataMny:data.pricepartial,
                  TImeSpend:(difference/1000)/60

                });
                
                addpoint(userId)




          
              } catch (error) {
                console.error("Erreur lors de la gestion du lien externe :", error);
                // alert("Une erreur s'est produite.");
              }
            
          }else{
            alert('Regarder 2 a 3 minutes de la video youtube cliquer')
            
          }
        
        // Logique personnalisée ici si nécessaire
       
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isaclick]);

  // Génère un nombre aléatoire entre `min` et `max`
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomMinutes = getRandomNumber(3, 5); // Temps aléatoire en minutes

  // Gestion des liens externes avec validation
  const handleExternalLink = async (url) => {
    if (!Authconfirmator()) {
      alert("Connectez-vous pour participer.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token non trouvé. Veuillez vous connecter.");
        return;
      }

      const decodeToken = (token) => {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
      };

      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;

      // Simule un appel API (décommenter pour un vrai appel)
      // const response = await axios.post("http://127.0.0.1:8000/user-interaction/", {
      //   action: "start",
      //   video_id: data.videoID,
      //   userid: userId,
      // });

      console.log("Ouverture du lien...");
      setIsaclick(true);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Erreur lors de la gestion du lien externe :", error);
      alert("Une erreur s'est produite.");
    }
  };

  // console.log(info)
  function handleSHARE(){
    console.log(data)

  }

function sharefunction(){
  // console.log(info)
  if(placeshare==''){
    setplaceShare(<SAHRE link={infos==null?'Veuillez Vous connecter pour voir votre lien':infos.third.ShareLink+"/"+data.id}/>)
  }
  else{
    setplaceShare('')
  }

}


  return (
    <div id="cardYte">
      <div id="headerC">
        <div id="bg">
          <div id="bgC">
            <i className="fa-solid fa-eye"></i>
          </div>
          <div id="bgp">
            <p>{data.viewCount}</p>
          </div>
        </div>
        <div id="pro">
          <div id="progressBig">
            <div id="progressSUb"></div>
          </div>
        </div>
        <div id="end">
          <div id="endC">
            <i className="fa-solid fa-eye-low-vision"></i>
          </div>
          <div id="endPC">
            <p>{data.endView}</p>
          </div>
        </div>
      </div>

      <div id="bodyC">
        <div id="subspart">
          {data.isview?(<div id="cacheDIV1">

            <div id="cacheDIV2"> <i className="fa-regular fa-eye-slash"></i></div>
            <div id="cacheDIV3"> Deja vu</div>
            
          </div>):( <div
            id="z1"
            onClick={() => handleExternalLink(data.videoID)}
          >
            <div id="1a">
              <p>Regarder {randomMinutes} Min</p>
            </div>
            <div id="z1b" className="ipy">
              <p>{data.pricepartial}$</p>
            </div>
          </div>)}
         
          <div id="x" onClick={sharefunction}>
            <div id="xa" >
              <p>Partager</p>
            </div>
            <div id="xb" className="ipy">
              <p>20$</p>
            </div>
          </div>
          <div id="z2" onClick={() => handleExternalLink(data.videoID)}>
            <div id="2a">
              <p>Regarder tout</p>
            </div>
            <div id="z2b" className="ipy">
              <p>{data.pricetotal}$</p>
            </div>
          </div>
        </div>
      </div>

      {showConfetti && <Confetti />}
      {rewardMessage && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>{rewardMessage}</p>
      )}


<div id="">
<div id="close" onClick={sharefunction}>{placeshare==''?"":<i className="fa-regular fa-circle-xmark"></i>}</div>

{placeshare}

</div>
    </div>
  );
}

function Paking() {
  return (
    <div>cardYoutubeViews</div>
  )
}



function SAHRE({ link }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Lien copié dans le presse-papier !");
        addpoint()
      },
      (err) => {
        console.error("Erreur lors de la copie du lien : ", err);
      }
    );
  };

  return (
    <div id="patage">
      <div id="upSHARE">
        <div id="Head">
          <p>Partager ce lien avec vos amis</p>
        </div>
        <div id="Message">
          <p>{link}</p>
          <div id="colle" onClick={copyToClipboard}>
            <i className="fa-solid fa-copy"></i>
          </div>
        </div>
      </div>
    </div>
  );
}


