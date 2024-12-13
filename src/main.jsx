import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Admis from './component/Admis/admis.jsx'
import Homepage from './component/homepage/homepage.jsx'
import Views from './component/navigation/page/views.jsx'
import Subs from './component/navigation/page/subs.jsx'
// import Quetes from './component/navigation/page/quetes.jsx'
// import Tiktok from './component/navigation/page/tiktok.jsx'
import Account from './component/Account/account.jsx'
import Compte from './component/Account/subaccount/compte.jsx'
import CC from './component/Account/subaccount/CC.jsx'

import Pay from './component/Account/subaccount/pay';
import Vdeoscreator from './component/videosCreator/vdeoscreator.jsx'
import Register from './component/auth/register.jsx'
import Login from './component/auth/login.jsx'
import Auth from './component/auth/auth.jsx'
import MissionSelector from './component/videosCreator/missions.jsx'


const routes=createBrowserRouter([
  {
    path:'',
    element:<Homepage/>,
    children:[
      {
        path:'/views',
        element:<Views/>
      },
      {
        path:'/subs',
        element:<Subs/>
      },
      // {
      //   path:'/Task',
      //   element:<Quetes/>
      // },
      // {
      //   path:'/Video',
      //   element:<Tiktok/>
      // },

    ]
    
  },
  {
    path:'/admins',
    element:<Admis/>
  },
  {
    path:'/User/Account',
    element:<Account/>,
    children:[
      ,{
        path:'/User/Account/X2',
        element:<Compte/>
      },
      ,{
        path:'/User/Account/pay',
        element:<Pay/>
      },
      ,{
        path:'/User/Account/CC',
        element:<CC/>
      },
    ]
  },
  {
    path:'videoMaker',
    element:<Vdeoscreator/>

  },
  {
    path:'auth',
    element:<Auth/>,
    children:[ {
      index: true,

element:<Register/>,

  },
  {


element:<Register/>,
path:'auth/Register',
},
  {
    path:'auth/Login',
    element:<Login/>
      }]
  },
 
  {
    path:'chooseMission',
    element:<MissionSelector/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
)
