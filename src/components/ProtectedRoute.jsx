import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/firebase'

const ProtectedRoutes = ({children}) => {
    const [user,loading]=useAuthState(auth)

    if (loading){
        return <div>Cargando...</div>
    }

    if (!user){
        return <Navigate to="/login"/>
    }

  return children
}

export default ProtectedRoutes