import React from 'react'
import './quetes.css'
import { useNavigate } from 'react-router-dom';

export default function Quetes() {
  const navigate = useNavigate();
  function gosub(){
    navigate('./subs');
  }
  return (
    <div id='a1'>
        <p>Gagner plus d'argent </p>
        <div id="id1go" onClick={gosub}>
            <p>Aller  <i className="fa-solid fa-arrow-right"></i></p>
        </div>
        
        </div>
    
   
  )
}
