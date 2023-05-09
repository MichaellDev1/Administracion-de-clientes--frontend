import React from 'react'
import { checkToken } from '../../helpers/getToken'
import { Navigate } from 'react-router-dom'

export default function PrivateRouterLogin ({ children, route }) {
  const { isSession } = checkToken()

  if (isSession) return <Navigate to={route} />

  return children
}
