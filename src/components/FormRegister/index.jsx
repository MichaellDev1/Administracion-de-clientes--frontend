import React, { useState } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: ''
}

export default function FormRegister () {
  const [dataUser, setDataUser] = useState(initialState)
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (isLoading) return
    setLoading(true)
    fetch('https://server-api-michaelldev1.vercel.app/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    }).then(response => response.json())
      .then(data => {
        setLoading(false)
        return navigate('/login')
      })
      .catch(e => {
        setError(true)
        setLoading(false)
      })
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
      <div className='flex items-center sm:flex-row flex-col'>
        <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5 mr-3 sm:w-[50%] w-full'>
          <span className='pl-3'>Name</span>
          <span className='absolute top-9 left-4 text-lg'><FiUser /></span>
          <input type='text' name='name' onChange={handleChangeInput} className='bg-white py-2 flex-1 rounded-3xl border text-neutral-500 pl-10 pr-5 border-neutral-300' />
        </label>
        <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5 sm:w-[50%] w-full'>
          <span className='pl-3'>Surname</span>
          <span className='absolute top-9 left-4 text-lg'><FiLock /></span>
          <input type='text' name='surname' onChange={handleChangeInput} className='bg-white py-2 flex-1 rounded-3xl border text-neutral-500 pl-10 pr-5  border-neutral-300' />
        </label>
      </div>
      <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5'>
        <span className='pl-3'>Email</span>
        <span className='absolute top-9 left-4 text-lg'><FiLock /></span>
        <input type='email' name='email' onChange={handleChangeInput} className='bg-white py-2 rounded-3xl border text-neutral-500 pl-10 pr-5  border-neutral-300' />
      </label>
      <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5'>
        <span className='pl-3'>Password</span>
        <span className='absolute top-9 left-4 text-lg'><FiLock /></span>
        <input type='password' name='password' onChange={handleChangeInput} className='bg-white py-2 rounded-3xl border text-neutral-500 pl-10 pr-5  border-neutral-300' />
      </label>
      <div className='my-2 pl-1 font-normal text-sm text-blue-500'>
        <Link to='/login' className=''>Do you already have an account?</Link>
      </div>
      <div className='flex flex-col'>
        {
        isError && <span className='text-red-500 font-normal text-sm pr-1'>Email already in use!!!</span>
      }
      </div>
      <button className='bg-blue-600 hover:bg-blue-500 transition-[background-color] font-semibold uppercase text-white w-full py-2 rounded-3xl text-base'>{isLoading ? 'Loading...' : 'Register'}</button>
    </form>
  )
}
