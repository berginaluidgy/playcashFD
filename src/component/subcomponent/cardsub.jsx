import React,{useState,useEffect} from 'react'
import './cardsub.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import acsHOMEINFO from '../Account/access/acsHOMEINFO'
import Authconfirmator from "../Auth.confirmator";
import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND';
import Loader from '../load/loadMain';
import addpoint from '../rank/addpoint';

export default function Cardsub() {


  
    const [Data,setdata]=useState(null)
useEffect(()=>{
  const token = localStorage.getItem("token");

let userId;

if (!token) {
  userId = 11; // Définit userId à 11 si le token est introuvable
} else {
  const decodeToken = (token) => {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  try {
    const decodedToken = decodeToken(token);
    userId = decodedToken.user_id; // Définit userId en fonction du token décodé
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    userId = 11; // Définit userId à 11 en cas d'erreur dans le décodage
  }
}

console.log(userId);

axios.get(DOMAINBACKEND+'/linky'+userId)
.then(res=>{
    console.log(res.data)
    setdata(res.data)
})



},[])
  return (

    <div>
        {Data===null?(<Loader/>):(<div>
{Data.map((E)=>(
<ComponentSub  key={E.linked} bool={E.issubs} nbrs={E.nbrS} nbrsF={E.nbrFocus} linked={E.linked}  subCash={E.subscash} share={E.shareCash}/>
))}

        </div>)}
    </div>
  )
}



function  ComponentSub(props) {
  const [placeshare, setplaceShare] = useState('');
const[linkSH,setlinkSH]=useState('nolink....WAIT PLEASE......')
    const navigate = useNavigate();
const nbrs=props.nbrs
const nbrF=props.nbrsF
const linked=props.linked
const subCash=props.subCash
const shareCash=props.share
const bool=props.bool
let useridPRO;
useEffect(()=>{
  const token = localStorage.getItem("token");
                if (!token) {
                   return;
                }
          
                const decodeToken = (token) => {
                  const payload = token.split(".")[1];
                  return JSON.parse(atob(payload));
                };
          
                const decodedToken = decodeToken(token);
                const userId = decodedToken.user_id;
                useridPRO=userId
                console.log(userId)


  function getYouTubeChannelId(url) {
    const regex = /channel\/([^?&/]+)/; // Expression régulière pour extraire l'ID
    const match = url.match(regex);
    if (match && match[1]) {
        return match[1]; // Retourne l'ID si trouvé
    } else {
        return null; // Retourne null si aucun ID trouvé
    }
}
var idlien=getYouTubeChannelId(linked)
setlinkSH(DOMAINBACKEND+'/YOUTUBE/MySharing--LinkCHANNEL/reward/'+userId+'/'+idlien)
},[localStorage.getItem("token")])

function sharefunction(){
  
  if(placeshare==''){
    setplaceShare(<SAHRE userid={useridPRO}link={linkSH}/>)
  }
  else{
    setplaceShare('')
  }

}

const handleExternalLink = async (url) => {
    if (!Authconfirmator()) {
      alert("Connectez-vous pour participer.");
      navigate("/auth/auth/login"); 
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const decodeToken = (token) => {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
      };

      const decodedToken = decodeToken(token);
      const userId = decodedToken.user_id;
      console.log(userId)
      addpoint(userId)
      const response = await axios.post(DOMAINBACKEND+"/defineLINK/", {
        link_url: url,
        userid: userId,
    money:subCash})

      console.log("Ouverture du lien...");
      
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Erreur lors de la gestion du lien externe :", error);
      alert("Une erreur s'est produite.");
    }
  };
  return (
    
    <div id='cardsubs'>
    <div id="headerC">
        <div id="bg">
           
            <div id="bgC"><i className="fa-solid fa-eye"></i></div> <div id="bgp"><p>{nbrs}</p></div></div>
        <div id="pro">
            <div id="progressBig">
            <div id="progressSUb"></div>
        </div></div>
        <div id="end">
            <div id="endC"><i className="fa-solid fa-eye-low-vision"></i></div>
            <div id="endPC"><p>{nbrF}</p></div>
        </div>
    </div>

    <div id="bodyC">

        <div id="subspart">
          {bool?(<div id="cacheDIV1">

<div id="cacheDIV2"> <i className="fa-regular fa-eye-slash"></i></div>
<div id="cacheDIV3"> Deja abonnés</div>

</div>):(
            <div id="axb" onClick={()=>{handleExternalLink(linked)}}>
            <div id="ba"><p>s'abonner</p></div>
            <div id="unb" ><p  className='ipy'>{subCash} $</p></div>
        </div>)}

        <div id="bxa" onClick={sharefunction}>
        <div id="xa"><p>partager</p></div>
        <div id="deuxb" ><p className='ipy'>{shareCash} $</p></div>
        </div>
       
        </div>

    </div>
    <div id="">
<div id="close" onClick={sharefunction}>{placeshare==''?"":<i className="fa-regular fa-circle-xmark"></i>}</div>

{placeshare}

</div>
</div>
  )
}




function SAHRE({ link ,userid}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Lien copié dans le presse-papier !");
        addpoint(userid)
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
          <p>{link.slice(10, 40)}</p>
          <div id="colle" onClick={copyToClipboard}>
            <i className="fa-solid fa-copy"></i>
          </div>
        </div>
      </div>
    </div>
  );
}


