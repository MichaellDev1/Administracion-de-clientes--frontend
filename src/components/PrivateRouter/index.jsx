import React from 'react'
import { ContextConsumerAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { checkToken, getToken } from '../../helpers/getToken'

export default function PrivateRouter ({ children }) {
  const { user } = ContextConsumerAuth()
  const { isSession } = checkToken()

  if (getToken() && !isSession) return <h3>Cargando...</h3>

  if (!user && !isSession) return <Navigate to='/login' />

  return children
}
