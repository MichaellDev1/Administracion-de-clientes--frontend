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
        <p className='text-sm mt-5 font-normal'>To prevent database overload, it will be limited to users who have a user role. While those with an admin role will be allowed to manage clients, I hope you understand..</p>
        <span className='capitalize font-semibold text-sm mt-2'>rol: {user.rol}</span>
      </div>
    </div>
  )
}
