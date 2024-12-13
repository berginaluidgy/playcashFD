import React from 'react'
import './SHOWTELEGRAM.css'
import Telegram from "../../assets/Telegram.png"
export default function SHOWTELEGRAM() {
  return (
    <div id='mainTelegram'>
        <div><i className="fa-solid fa-triangle-exclamation"></i></div>
        <div></div>
        Nous contacter directement sur telegram 
        <div id="pic"><img src={Telegram} alt="" /></div></div>
  )
}
