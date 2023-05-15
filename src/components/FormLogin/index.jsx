import React, { useState } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import { ContextConsumerAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { checkToken } from '../../helpers/getToken'

import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md'

const initialState = {
  email: '',
  password: ''
}

export default function FormLogin () {
  const [dataUser, setDataUser] = useState(initialState)
  const { setUser } = ContextConsumerAuth()
  const { setSession } = checkToken()
  const [isShowPassword, setShowPassword] = useState(false)
  const [isErrorOrLoading, setErrorOrLoading] = useState({
    error: false,
    loading: false,
    message: ''
  })
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (isErrorOrLoading.loading === true) return
    setErrorOrLoading({ error: false, loading: true, message: '' })
    fetch('https://server-api-michaelldev1.vercel.app/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    }).then(response => response.json())
      .then(data => {
        setUser(data)
        setSession(false)
        window.localStorage.setItem('SESSION_ID', data.token)
        navigate('/')
      })
      .catch(e => setErrorOrLoading({ error: true, loading: false, message: 'e' }))
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setDataUser({
      ...dataUser,
      [name]: value
    })
  }

  return (
    <form className='sm:min-w-[370px] min-w-[300px]' onSubmit={handleLogin}>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-normal text-blue-700'>Welcome!</h2>
        <p className='text-xl font-light text-blue-300'>Sign in to your Account</p>
      </div>
      <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5'>
        <span className='pl-3'>Email</span>
        <span className='absolute top-9 left-4 text-lg'><FiUser /></span>
        <input type='text' name='email' onChange={handleChangeInput} className='bg-white py-2 rounded-3xl border text-neutral-500 pl-10 pr-5 border-neutral-300' />
      </label>
      <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5'>
        <span className='pl-3'>Password</span>
        <span className='absolute top-9 left-4 text-lg'><FiLock /></span>
        <input type={isShowPassword ? 'text' : 'password'} name='password' onChange={handleChangeInput} className='bg-white py-2 rounded-3xl border text-neutral-500 pl-10 pr-5  border-neutral-300' />
        <span className='absolute flex  justify-center items-center text-xl right-6 top-[45px]'>
          <span className='pointer-events-none absolute'> {isShowPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}</span>
          <input type='button' onClick={() => setShowPassword(!isShowPassword)} className='w-7 h-7  absolute cursor-pointer' />
        </span>
      </label>
      <div className='my-2 pl-1 font-normal text-sm text-blue-500'>
        <Link to='/register' className=''>Do you already have an account?</Link>
      </div>
      <div className='flex flex-col'>
        {isErrorOrLoading.error && <span className='text-red-500 font-normal text-sm pl-1'>invalid credentials!!!</span>}
      </div>
      <button className='bg-blue-600 hover:bg-blue-500 transition-[background-color] font-semibold uppercase text-white w-full py-2 rounded-3xl text-base mb-2'>{isErrorOrLoading.loading ? 'Loading...' : 'Sign Up'}</button>
    </form>
  )
}
