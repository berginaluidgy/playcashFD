import './cardshowImp.css'
import React,{useState,useRef, useEffect} from 'react'
import axios from 'axios'
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
      
        {data.can_request ?(<div id="request">
          
            <div id='txt'><p>Recoit des recharges DIGICEL tous les jours</p></div>
<div id='clickBUTTON'><p>Demander</p></div> 
{/* <PopUp/> */}
</div>):(<div id='txt'> <p>Regarder 60 videos Pour recevoir des minutes DIGICEL /NATCOM . NBRS LUES :{data.video_count} VIDEOS</p>  </div>) }
    </div>
  )
}

import { color, motion } from "framer-motion";

const TelecomLogos = () => {
  const styles = {
    digicel: {
// color: "linear-gradient(135deg, #E30613, #FC636B)",
      background:'#333',
      color:'red',
      fontSize: "4rem",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
      padding: "1%",
      borderRadius: "3%",
      textAlign: "center",
      margin: "7%",

    },
    natcom: {
      background: "linear-gradient(135deg, #0076BC, #39B44A)",
      color: "gray",
      fontSize: "4rem",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      margin: "20px",
    },
  };

  return (
    <div id='animate' style={{ display: "flex", justifyContent:"center",}}>
      {/* Digicel */}
      <motion.div
        style={styles.digicel}
        initial={{ scale: 1.0, opacity: 0 }}
        animate={{ scale: 1.0, opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        
        DIGICEL

      </motion.div>

    </div>
  );
};

 function PopUp() {
  useEffect(()=>{
axios.post(DOMAINBACKEND+'/digicelget',{

})
  },[])
  return (
    <div id='popup'>
      <div id="popup">
<WheelOfFortune/>


      </div>
    </div>
  )
}



const WheelOfFortune = () => {
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef(null);

  // Les valeurs et leurs probabilités
  const slices = [
    { value: 250, probability: 0.4, color: "#F08080" },
    { value: 500, probability: 0.2, color: "#FFD700" },
    { value: 750, probability: 0.15, color: "#7FFFD4" },
    { value: 1000, probability: 0.15, color: "#9370DB" },
    { value: 4000, probability: 0.1, color: "#FF4500" },
  ];

  // Fonction pour dessiner la roue
  const renderWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const totalSlices = slices.length;
    const canvasSize = canvas.width;
    const radius = canvasSize / 2;

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    let startAngle = 0;

    slices.forEach((slice) => {
      const sliceAngle = 2 * Math.PI * slice.probability;
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, startAngle + sliceAngle);
      ctx.fillStyle = slice.color;
      ctx.fill();
      ctx.closePath();
      startAngle += sliceAngle;

      // Ajouter le texte au milieu de chaque tranche
      const textAngle = startAngle - sliceAngle / 2;
      ctx.save();
      ctx.translate(
        radius + Math.cos(textAngle) * (radius * 0.7),
        radius + Math.sin(textAngle) * (radius * 0.7)
      );
      ctx.rotate(textAngle);
      ctx.fillStyle = "#000";
      ctx.font = "14px Arial";
      ctx.fillText(slice.value, -10, 5);
      ctx.restore();
    });
  };

  React.useEffect(() => {
    renderWheel();
  }, []);

  // Génère la rotation aléatoire
  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Tirage aléatoire selon les probabilités
    const random = Math.random();
    let cumulativeProbability = 0;
    let selectedSliceIndex = 0;

    for (let i = 0; i < slices.length; i++) {
      cumulativeProbability += slices[i].probability;
      if (random < cumulativeProbability) {
        selectedSliceIndex = i;
        break;
      }
    }

    const sliceAngle = 360 / slices.length;
    const selectedAngle = selectedSliceIndex * sliceAngle + sliceAngle / 2;
    const spins = 5 * 360; // 5 tours complets
    const finalRotation = spins + (360 - selectedAngle);

    // Animation de la roue
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const currentRotation =
        rotation + (finalRotation - rotation) * (progress / 3000); // Durée de 3 secondes
      setRotation(currentRotation);

      if (progress < 3000) {
        requestAnimationFrame(animate);
      } else {
        setRotation(finalRotation);
        setResult(slices[selectedSliceIndex].value); // Met à jour le résultat avec la bonne tranche
        setIsSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Roue de tirage</h1>
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Canvas de la roue */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 3s cubic-bezier(0.32, 0.64, 0.45, 1)" : "none",
            borderRadius: "50%",
          }}
        ></canvas>
        {/* Indicateur */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "20px solid red",
          }}
        ></div>
      </div>
      <button
        onClick={spinWheel}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: isSpinning ? "not-allowed" : "pointer",
        }}
        disabled={isSpinning}
      >
        Faire tourner
      </button>
      {result && (
        <div style={{ marginTop: "20px", fontSize: "24px" }}>
          🎉 Résultat: {result}  HTG DIGICEL 🎉
        </div>
      )}
    </div>
  );
};


