import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { ContextConsumerAuth } from '../../context/AuthContext'

export default function MenuFilter ({ setCustomers, setOptionsFilter }) {
  const [isShowFech, setShowFech] = useState(false)
  const [isShowDni, setShowDni] = useState(false)
  const [isShowName, setShowName] = useState(false)
  const [moreRecent, setMoreRecent] = useState(false)
  const [moreAncient, setMoreAncient] = useState(false)
  const { user } = ContextConsumerAuth()
  const [filterName, setFilterName] = useState()
  const [filterDni, setFilterDni] = useState()

  const handleFilterButtton = (e) => {
    if (filterName && !filterDni) {
      fetch(`http://localhost:4000/customer/name/${filterName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
          moreRecent
        }
      }).then(response => response.json())
        .then(res => {
          setCustomers(res)
          setOptionsFilter(false)
        })
    }

    if (filterDni && !filterName) {
      fetch(`http://localhost:4000/customer/dni/${filterDni}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
          moreRecent
        }
      }).then(response => response.json())
        .then(res => {
          setCustomers(res)
          setOptionsFilter(false)
        })
    }

    if (filterDni && filterName) {
      fetch(`http://localhost:4000/customer/${filterName}/${filterDni}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
          moreRecent
        }
      }).then(response => response.json())
        .then(res => {
          setCustomers(res)
          setOptionsFilter(false)
        })
    }

    if (moreAncient || moreRecent) {
      if (!filterDni && !filterName) {
        fetch('http://localhost:4000/customer/filter', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            moreRecent,
            Authorization: `Bearer ${user.token}`
          }
        }).then(response => response.json())
          .then(res => {
            setCustomers(res)
            setOptionsFilter(false)
          })
      }
    }
  }

  const handleChekedRecent = (e) => {
    setMoreRecent(e.target.checked)
    if (moreAncient) {
      setMoreAncient(false)
    }
  }

  const handleChekedAncient = (e) => {
    setMoreAncient(e.target.checked)
    if (moreRecent) {
      setMoreRecent(false)
    }
  }

  return (
    <div className='w-[220px] -top-20 min-h-[300px] bg-white shadow-2xl p-8 flex flex-col justify-center rounded-md absolute z-10 text-neutral-900 right-[100px]'>
      <h3 className='text-xl font-semibold'>Filtrar por:</h3>
      <ul className='mt-2'>
        <li className='mb-2 py-1'>
          <button className='text-[17px] font-medium text-neutral-700 flex items-center' onClick={() => setShowFech(!isShowFech)}>Fecha<span className='text-sm'><IoIosArrowDown /></span></button>
          <div className={` flex-col ${isShowFech ? 'flex' : 'hidden'}`}>
            <label htmlFor=''>
              <input type='checkbox' onChange={(e) => handleChekedRecent(e)} checked={moreRecent} />
              Mas reciente
            </label>
            <label htmlFor=''>
              <input
                type='checkbox' onChange={(e) => handleChekedAncient(e)}
                checked={moreAncient}
              />
              Mas antiguo
            </label>
          </div>
        </li>
        <li className='mb-2 py-1'>
          <button className='text-[17px] font-medium text-neutral-700 flex items-center' onClick={() => setShowName(!isShowName)}>Nombre<span className='text-sm'><IoIosArrowDown /></span></button>
          <div className={` flex-col ${isShowName ? 'flex' : 'hidden'}`}>
            <input className='bg-white py-1 rounded-md border text-neutral-500 px-5  border-neutral-300' type='text' onChange={(e) => setFilterName(e.target.value)} />
          </div>
        </li>
        <li className='mb-2 py-1'>
          <button className='text-[17px] font-medium text-neutral-700 flex items-center' onClick={() => setShowDni(!isShowDni)}>Dni<span className='text-sm'><IoIosArrowDown /></span></button>
          <div className={` flex-col ${isShowDni ? 'flex' : 'hidden'}`}>
            <input
              className='bg-white py-1 rounded-md border text-neutral-500 px-5  border-neutral-300' type='text' onChange={(e) => {
                setFilterDni(e.target.value)
              }}
            />
          </div>
        </li>
      </ul>
      <button className='bg-amber-300 py-1 rounded-md text-white w-full font-semibold' onClick={handleFilterButtton}>Filtrar</button>
    </div>
  )
}
