import React from 'react'
import './account.css'
import Header from '../header/header'
import { Link , Outlet } from 'react-router-dom'

export default function Account() {
  return (
    <div id='Account'>
          <Header/>
        <div id="menu">
            <div id=""><p><Link to={'/User/Account/X2'}>Compte </Link> </p></div>
            <div id=""><p>  <Link  to={'/User/Account/pay'}>Paiement</Link></p></div>
            <div id=""><p> <Link to={'/User/Account/CC'}>Contact</Link> </p></div>
        </div>
  <div id="Outlet">
    <Outlet/>
  </div>
        </div>
  )
}
