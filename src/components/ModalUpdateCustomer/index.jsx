import React, { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { ContextConsumerAuth } from '../../context/AuthContext'

export default function ModalUpdateCustomer ({ nullSelected, customerSelected }) {
  const { user } = ContextConsumerAuth()
  const { data } = customerSelected

  const [newDataCustomer, setNewDataCustomer] = useState({
    name: data.name,
    surname: data.surname,
    dni: data.dni,
    state: data.state
  })

  const handleChangeInputUpdate = (e) => {
    const { name, value } = e.target
    setNewDataCustomer({
      ...newDataCustomer,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:4000/customer/update/${data._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(newDataCustomer)
    })
    nullSelected(null)
  }

  return (
    <div className='absolute z-10 w-[90%] min-h-[350px] bg-neutral-200 rounded-md flex-col flex justify-center items-center p-5 m-auto left-0 right-0'>
      <div className='w-full text-right text-2xl'>
        <button className='text-[#303030]' onClick={() => nullSelected()}><MdOutlineClose /></button>
      </div>
      <form className='flex flex-col w-full' onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Name
          <input type='text' name='name' className='mb-4 px-5 py-2 mt-1' value={newDataCustomer.name} onChange={(e) => handleChangeInputUpdate(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Surname
          <input type='text' name='surname' className='mb-4 px-5 py-2 mt-1' value={newDataCustomer.surname} onChange={(e) => handleChangeInputUpdate(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          Identification document
          <input type='number' name='dni' className='mb-4 px-5 py-2 mt-1' value={newDataCustomer.dni} onChange={(e) => handleChangeInputUpdate(e)} />
        </label>
        <label htmlFor='' className='flex text-base font-semibold text-[#303030] flex-col'>
          State
          <input type='text' name='state' className='mb-4 px-5 py-2 mt-1' value={newDataCustomer.state} onChange={(e) => handleChangeInputUpdate(e)} />
        </label>
        <div className='w-full text-right'>
          <button className='bg-green-400 hover:bg-green-300 text-white transition-[background-color] font-semibold py-[6px] px-7 rounded-md mt-2'>Add</button>
        </div>
      </form>
    </div>
  )
}
