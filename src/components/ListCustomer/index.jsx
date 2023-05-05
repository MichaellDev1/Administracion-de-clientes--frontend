import React from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'

export default function ListCustomer ({ customer, handleDeleteCustomer }) {
  return (
    <ul className='max-h-[300px] w-full'>
      {
        customer.map(({ name, state, surname, dni, _id }) => <li key={_id}>
          <div className='my-5 flex justify-between items-center'>
            <div className='flex flex-col'>
              <h3 className='text-neutral-800 font-semibold text-base'>{name} {surname}</h3>
              <span className='text-neutral-500 font-medium text-sm'>{dni}</span>
              <span className='text-neutral-500 font-medium text-sm'>{state}</span>
            </div>
            <div className='flex'>
              <button className='font-semibold  text-neutral-500 p-1  rounded-lg py-1 mt-2 text-lg mr-2' onClick={() => handleDeleteCustomer({ id: _id })}>
                <HiOutlinePencil />
              </button>
              <button className='font-semibold  text-neutral-500 p-2  rounded-lg py-1 text-lg mt-2' onClick={() => handleDeleteCustomer({ id: _id })}>
                <MdDeleteOutline />
              </button>
            </div>
          </div>
                                                             </li>)
      }
    </ul>
  )
}
