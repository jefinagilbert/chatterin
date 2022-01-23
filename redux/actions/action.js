import firebase from "firebase"
import React, { useEffect, useState } from "react"


export function addCurrentUser(currentUser){
    return{
        type : 'CURRENTUSER',
        currentUser
    }
}