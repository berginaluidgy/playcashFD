import React from 'react'

export default function Authconfirmator() {
     const token=localStorage.getItem('token')
if (token){
    return true
}
else{
    return false
}
  
}
