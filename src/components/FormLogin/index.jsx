import React, { useState } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import { ContextConsumerAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { checkToken } from '../../helpers/getToken'

const initialState = {
  email: '',
  password: ''
}

export default function FormLogin () {
  const [dataUser, setDataUser] = useState(initialState)
  const { setUser } = ContextConsumerAuth()
  const { setSession } = checkToken()
  const [isError, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:4000/auth/login', {
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
      .catch(e => setError(true))
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
        <input type='password' name='password' onChange={handleChangeInput} className='bg-white py-2 rounded-3xl border text-neutral-500 pl-10 pr-5  border-neutral-300' />
      </label>

      <button className='bg-blue-600 hover:bg-blue-500 transition-[background-color] font-semibold uppercase text-white w-full py-2 rounded-3xl text-base mt-5 mb-2'>Sign Up</button>
      <div className='flex flex-col'>
        {
        isError ? <span className='text-red-500 font-normal text-sm'>An error occurred!!!</span> : null
      }
        <a href='#' className='text-sm font-light text-blue-600'>Forgot your password?</a>
      </div>
    </form>
  )
}
