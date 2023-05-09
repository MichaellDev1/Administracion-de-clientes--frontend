import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { ContextConsumerAuth } from '../../context/AuthContext'
import MenuUser from '../MenuUser'

export default function Header () {
  const { user } = ContextConsumerAuth()
  const [menuUserShow, setMenuUserShow] = useState(false)

  const handleMenuUserShow = () => {
    setMenuUserShow(!menuUserShow)
  }

  return (
    <div>
      <header className='bg-[#262E52] text-[#fff] w-full h-16 flex justify-between relative items-center sm:px-10 px-5 z-20'>
        <div />
        <button className='flex items-center py-1 px-2 rounded-xl transition-[background-color] hover:bg-[#3d4879]' onClick={() => handleMenuUserShow()}>
          <div className='w-10 h-10 rounded-full overflow-hidden mr-2'>
            <img src={user.image} alt={`user image ${user.name}`} className='w-full h-full object-cover' />
          </div>
          <div style={{ lineHeight: 0 }} className='text-left'>
            <h5 className='text-[15px] font-medium' style={{ lineHeight: 1 }}>{user.name} {user.surname}</h5>
            <span className='text-[14px] font-semibold text-neutral-300 capitalize' style={{ lineHeight: 1 }}>{user.rol.includes('admin') ? 'admin' : 'user'}</span>
          </div>
          <span className='ml-2 text'><IoIosArrowDown /></span>
        </button>
      </header>
      <MenuUser menuUserShow={menuUserShow} />
    </div>

  )
}
