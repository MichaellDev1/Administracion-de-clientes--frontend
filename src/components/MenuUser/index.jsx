import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextConsumerAuth } from '../../context/AuthContext'
import ModalDeleteAccount from '../ModalDeleteAccoun'

export default function MenuUser ({ menuUserShow }) {
  const { user, setUser } = ContextConsumerAuth()
  const [modalDelete, setModalDelete] = useState(false)
  const navigate = useNavigate()

  const logOutFunction = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('SESSION_ID')
    return navigate('/login')
  }

  const deleteAccount = (e) => {
    e.preventDefault()
    setModalDelete(true)
  }

  return (
    <div className={`absolute  ${menuUserShow ? 'top-[63px]' : '-top-full'} sm:right-10 right-5 bg-[#262E52] text-white z-10 transition-[top] min-h-[250px] flex flex-col justify-center min-w-[210px] px-5 rounded-b-md`}>
      <div>
        <div className='w-[85px] h-[85px] rounded-full overflow-hidden mb-3'>
          <img src={user.image} alt={`image user ${user.surname}`} className='w-full h-full object-cover' />
        </div>
      </div>
      {
        modalDelete ? <ModalDeleteAccount setModalDelete={setModalDelete} /> : null
      }
      <ul className='flex flex-col'>

        <li className='text-[15px] mb-2 font-medium'>
          <a href='#'>Mi cuenta</a>
        </li>
        <li className='text-[15px] mb-2 font-medium'>
          <a href='#' onClick={(e) => deleteAccount(e)}>Eliminar cuenta</a>
        </li>
        <li className='text-[15px] mb-2 font-medium'>
          <a href='#' onClick={(e) => logOutFunction(e)}>Cerrar session</a>
        </li>
      </ul>
    </div>
  )
}
