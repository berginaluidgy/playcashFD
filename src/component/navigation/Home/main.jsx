import './main.css'
import React from 'react'
import { Link , Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <div id='globalHome'>

    <div id='menuNavigation'>
        <div id="">
            <Link to={'./views'}>Views</Link>
        </div>
        <div id="">
            <Link to={'./subs'}> Subs</Link>
        </div>
        {/* <div id="">
            <Link to={'./Task'}>  Quetes</Link>
        </div> */}
        <div id="">
            <Link to={'./Video'}>Video </Link>
        </div>
    </div>
    
    <div id="Outlet"><Outlet/></div>
    </div>
  )
}
