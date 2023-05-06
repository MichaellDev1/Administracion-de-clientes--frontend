import React, { useState } from 'react'
import { HiOutlinePencil } from 'react-icons/hi'
import { MdDeleteOutline } from 'react-icons/md'
import ModalUpdateCustomer from '../ModalUpdateCustomer'

export default function ListCustomer ({ customer, handleDeleteCustomer }) {
  const [customerSelected, setCustomerSelected] = useState()
  const handleUpdateCustomer = ({ name, state, surname, dni, _id }) => {
    setCustomerSelected({
      data: {
        name, state, surname, dni, _id
      }
    })
  }

  const nullSelected = () => {
    setCustomerSelected(null)
  }

  return (
    <div>
      {
        customerSelected
          ? <div className='w-full h-full top-0 left-0 absolute flex justify-center items-center'><ModalUpdateCustomer nullSelected={nullSelected} customerSelected={customerSelected} /></div>
          : null
      }

      <div className='max-h-[400px] overflow-y-scroll mt-2'>
        <table>
          <thead>
            <tr>
              <th className='uppercase text-[#252525]'>NAME</th>
              <th className='uppercase text-[#252525]'>DNI</th>
              <th className='uppercase text-[#252525]'>STATE</th>
              <th className='uppercase text-[#252525]'>CREATION DATE</th>
              <th className='uppercase text-[#252525]'>edit or remove</th>
            </tr>
          </thead>

          <tbody>
            {
        customer.length > 0
          ? customer.map(({
            name, state, surname, dni, _id,
            createdAt
          }) => <tr key={_id}>
            <th scope='row'><h3 className='text-neutral-800 font-semibold text-base capitalize'>{name} {surname}</h3></th>
            <th><span className='text-neutral-500 font-medium text-sm'>{dni}</span></th>
            <th>   <span className='text-neutral-500 font-medium text-sm'>{state}</span></th>
            <th> <span className='text-neutral-500 font-medium text-sm'>{
    createdAt.split('T')[0]
    }
            </span>
            </th>
            <th>   <div className='flex justify-center'>
              <button className='font-semibold  text-neutral-500 p-1  rounded-lg py-1 mt-2 text-lg mr-2' onClick={() => handleUpdateCustomer({ name, state, surname, dni, _id })}>
                <HiOutlinePencil />
              </button>
              <button className='font-semibold  text-neutral-500 p-2  rounded-lg py-1 text-lg mt-2' onClick={() => handleDeleteCustomer({ id: _id })}>
                <MdDeleteOutline />
              </button>
            </div>
            </th>
                </tr>)
          : <h3 className='text-base font-normal text-[#858585]'>Unregistered customers...</h3>
      }

          </tbody>

        </table>
      </div>

    </div>

  )
}
