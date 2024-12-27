import React from 'react'
import axios from 'axios'

import DOMAINBACKEND from '../GLOBALVAR/DOMAINBACKEND'
export default function addpoint(userid) {
 axios.post(DOMAINBACKEND+'/'+"api/add-points/",{
    user_id:userid
 })
}
