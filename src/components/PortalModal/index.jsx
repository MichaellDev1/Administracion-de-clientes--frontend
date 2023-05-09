import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const FormDelete = ({ handleSubmit, setModalDelete }) => {
  const [dataUser, setDataUser] = useState({
    email: '',
    password: ''
  })

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setDataUser({
      ...dataUser,
      [name]: value
    })
  }

  return (
    <form className='w-full flex flex-col' onSubmit={(e) => handleSubmit({ e, data: dataUser })}>
      <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5'>
        <span className='pl-3'>Email</span>
        <input type='email' name='email' onChange={handleChangeInput} className='bg-white py-2 rounded-3xl border text-neutral-500 pl-10 pr-5  border-neutral-300' />
      </label>
      <label htmlFor='' className='flex relative text-base flex-col text-neutral-400 font-normal mt-5'>
        <span className='pl-3'>Password</span>
        <input type='password' name='password' onChange={handleChangeInput} className='bg-white py-2 rounded-3xl border text-neutral-500 pl-10 pr-5  border-neutral-300' />
      </label>
      <button className='bg-blue-600 hover:bg-blue-500 transition-[background-color] font-semibold uppercase text-white w-full py-2 rounded-3xl text-base'>Register</button>
    </form>
  )
}

export default function PortalModal ({ setModalDelete }) {
  const [isYes, setYes] = useState(false)
  const navigate = useNavigate()
  const deleteAccount = () => {
    setYes(true)
  }
  const handleSubmit = ({ e, data }) => {
    e.preventDefault()

    if (!data.email && !data.password) return
    fetch('http://localhost:4000/auth', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      window.localStorage.removeItem('sessionid')
      return navigate('/login')
    })
  }

  return (
    <div className='w-full flex justify-center items-center min-h-[100vh] top-0 z-20 left-0 fixed'>
      <div className='min-w-[400px] flex flex-col justify-center rounded-md items-center min-h-[200px] bg-white p-10 text-center' style={{ boxShadow: '1px 6px 39px rgba(0 0 0 / 20%)' }}>
        <h4 className='text-black font-semibold text-xl max-w-[90%]'>Seguro que quieres eliminar tu cuenta?</h4>
        {
            isYes
              ? <FormDelete handleSubmit={handleSubmit} setModalDelete={setModalDelete} />
              : <div className='mt-5'>
                <button onClick={() => deleteAccount()} className='font-semibold mx-2 text-lg py-1 text-neutral-100 px-6 rounded-2xl' style={{ backgroundColor: '#f59898' }}>Yes</button>
                <button onClick={() => setModalDelete(false)} className='font-semibold mx-2 text-lg py-1 text-neutral-100 px-6 rounded-2xl' style={{ backgroundColor: 'rgb(109 229 163)' }}>Not</button>
                </div>
        }
      </div>
    </div>
  )
}
