import React, { useEffect } from 'react'
import './homepage.css'
import Header from '../header/header'
import CardshowImp from '../cardshowImp/cardshowImp'
import Main from '../navigation/Home/main'
import acsHOMEINFO from '../Account/access/acsHOMEINFO'
import ExternalLinkReward from './../bigtry';
import SHOWTELEGRAM from '../SHOWTELEGRAM/SHOWTELEGRAM'

export default function Homepage() {
 
  return (
  
    <div  id='homefirst'> 
    {/* <ExternalLinkReward/> */}
      <Header/>
      <div id="cardImp">
      <CardshowImp/>
      </div>
      {/* <SHOWTELEGRAM/> */}
      <Main/>
    </div>
  )
}
