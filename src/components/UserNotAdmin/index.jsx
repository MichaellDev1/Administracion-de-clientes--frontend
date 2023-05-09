import React from 'react'
import { ContextConsumerAuth } from '../../context/AuthContext'

export default function UserNotAdmin () {
  const { user } = ContextConsumerAuth()
  return (
    <div className='w-full min-h-[100vh] flex justify-center items-center'>
      <div className='text-center flex flex-col items-center max-w-[520px]'>
        <div className='w-[100px] h-[100px] rounded-full overflow-hidden mb-5'>
          <img src={user.image} alt='userImage' className='w-full h-full object-cover' />
        </div>
        <h1 className='flex flex-col text-2xl font-normal' style={{ lineHeight: 1 }}><span>Hello</span><span className='mt-1'>{user.name} {user.surname}</span></h1>
        <p className='text-sm mt-5 font-normal'>Por prevención de sobrecarga de la base de dato se estara limitando a los usuarios que tengan un rol de usuario. Mientras que los que contengan un rol de administrador estaran admitidos a administrar clientes, espero que comprenda.</p>
        <span className='capitalize font-semibold text-sm mt-2'>Su rol: {user.rol}</span>
      </div>
    </div>
  )
}
