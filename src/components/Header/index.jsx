import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { ContextConsumerAuth } from '../../context/AuthContext'
import MenuUser from '../MenuUser'

export default function Header () {
  const { user } = ContextConsumerAuth()
  return (
    <header className='bg-[#262E52] text-[#fff] w-full h-16 flex justify-between items-center px-10'>
      <div />
      <button className='flex items-center py-1 px-2 rounded-xl transition-[background-color] hover:bg-[#3d4879]'>
        <div className='w-10 h-10 rounded-full overflow-hidden mr-2'>
          <img src='https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436179.jpg?w=740&t=st=1683289067~exp=1683289667~hmac=3e7bd543d368176757b75e64dfe73d8bb5bced94d3ec0cf1d88550127c9c6d05' alt={`user image ${user.name}`} />
        </div>
        <div style={{ lineHeight: 0 }} className='text-left'>
          <h5 className='text-[15px] font-medium' style={{ lineHeight: 1 }}>{user.name} {user.surname}</h5>
          <span className='text-[14px] font-semibold text-neutral-200 capitalize' style={{ lineHeight: 1 }}>{user.rol.includes('admin') ? 'admin' : 'user'}</span>
        </div>
        <span className='ml-2 text'><IoIosArrowDown /></span>
      </button>
      <MenuUser />
    </header>
  )
}
