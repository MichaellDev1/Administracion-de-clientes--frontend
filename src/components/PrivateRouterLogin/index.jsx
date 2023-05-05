import React from 'react'
import { checkToken } from '../../helpers/getToken'
import { Navigate } from 'react-router-dom'

export default function PrivateRouterLogin ({ children }) {
  const { isSession } = checkToken()

  if (isSession) return <Navigate to='/' />

  return children
}
