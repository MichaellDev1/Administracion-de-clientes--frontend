import React from 'react'
import Login from '../page/Login'
import Home from '../page/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRouter from '../components/PrivateRouter'
import PrivateRouterLogin from '../components/PrivateRouterLogin'
import Register from '../page/Register'

export default function RouterApp () {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/' element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
}
        />
        <Route
          path='/login' element={
            <PrivateRouterLogin route='/login'>
              <Login />
            </PrivateRouterLogin>
          }
        />
        <Route
          path='/register' element={
            <PrivateRouterLogin route='/register'>
              <Register />
            </PrivateRouterLogin>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
