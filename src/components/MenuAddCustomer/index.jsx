import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

export default function MenuAddCustomer ({ handleShowMenu, handleChange, handleAddCutomer }) {
  return (
    <div className='fixed w-[90%] min-h-[350px] bg-neutral-200 rounded-md flex-col flex justify-center items-center p-5 m-auto left-0 right-0'>
      <div className='w-full text-right text-2xl'>
        <button className='text-[#303030]' onClick={() => handleShowMenu()}><MdOutlineClose /></button>
      </div>
      <form className='flex flex-col w-full' onSubmit={(e) => handleAddCutomer(e)}>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Name
          <input type='text' name='name' id='' className='mb-4 px-5 py-2 mt-1' onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Surname
          <input type='text' name='surname' id='' className='mb-4 px-5 py-2 mt-1' onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Identification document
          <input type='number' name='dni' id='' className='mb-4 px-5 py-2 mt-1' onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          State
          <input type='text' name='state' id='' className='mb-4 px-5 py-2 mt-1' onChange={(e) => handleChange(e)} />
        </label>
        <div className='w-full text-right'>
          <button className='bg-green-400 hover:bg-green-300 text-white transition-[background-color] font-semibold py-[6px] px-7 rounded-md mt-2'>Add</button>
        </div>
      </form>
    </div>
  )
}
