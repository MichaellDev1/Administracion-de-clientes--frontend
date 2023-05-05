import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

export default function ModalAddCustomer ({ handleShowMenu, handleChange, handleAddCutomer }) {
  return (
    <div className='absolute w-[100%] min-h-[350px] bg-white  z-10 rounded-md flex-col flex justify-center items-center p-5 m-auto left-0 right-0'>
      <div className='w-full text-right text-2xl'>
        <button className='text-[#303030]' onClick={() => handleShowMenu()}><MdOutlineClose /></button>
      </div>
      <form className='flex flex-col w-full' onSubmit={(e) => handleAddCutomer(e)}>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Name
          <input type='text' name='name' id='' className='bg-white py-2 rounded-lg mb-4 mt-1 border text-neutral-500 px-5  border-neutral-300' onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Surname
          <input type='text' name='surname' id='' className='bg-white py-2 rounded-lg mb-4 mt-1 border text-neutral-500 px-5  border-neutral-300' onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Identification document
          <input type='number' name='dni' id='' className='bg-white py-2 rounded-lg mb-4 mt-1 border text-neutral-500 px-5  border-neutral-300' onChange={(e) => handleChange(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          State
          <input type='text' name='state' id='' className='bg-white py-2 rounded-lg mb-4 mt-1 border text-neutral-500 px-5  border-neutral-300' onChange={(e) => handleChange(e)} />
        </label>
        <div className='w-full text-right'>
          <button className='bg-green-400 hover:bg-green-300 text-white transition-[background-color] font-semibold py-[6px] px-7 rounded-md mt-2'>Add</button>
        </div>
      </form>
    </div>
  )
}
