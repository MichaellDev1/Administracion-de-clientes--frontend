import { useEffect, useState } from 'react'
import { ContextConsumerAuth } from '../../context/AuthContext'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { BiFilterAlt, BiRefresh } from 'react-icons/bi'
import ListCustomer from '../ListCustomer'
import ModalAddCustomer from '../ModalAddCustomer'
import MenuFilter from '../MenuFilter'

const initialState = {
  name: '',
  surname: '',
  dni: '',
  state: ''
}

export default function DashboardCustomer () {
  const [isAuth, setAuth] = useState(false)
  const [customer, setCustomers] = useState()
  const { user } = ContextConsumerAuth()
  const [addCutomer, setAddCustomer] = useState(initialState)
  const [menuShow, setShowMenu] = useState(false)
  const [optionsFilter, setOptionsFilter] = useState(false)

  useEffect(() => {
    if (user) {
      if (user.rol.includes('admin')) {
        fetch('http://localhost:4000/customer', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
          .then(response => response.json())
          .then(res => {
            if (res.error) return setAuth(false)
            setAuth(true)
            setCustomers(res)
          })
          .catch(e => {
            setAuth(false)
          })
      }
    }
  }, [])

  const handleAddCutomer = (e) => {
    e.preventDefault()
    fetch('http://localhost:4000/customer/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`

      },
      body: JSON.stringify({ ...addCutomer })
    })
      .then(response => response.json())
      .then(res => {
        if (res.message) return
        setAuth(true)
        setCustomers([...customer, res])
        setShowMenu(false)
      })
      .catch(e => {
        throw e
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddCustomer({
      ...addCutomer,
      [name]: value
    })
  }

  const handleDeleteCustomer = ({ id }) => {
    fetch(`http://localhost:4000/customer/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(response => response.json())
      .then(res => {
        setAuth(true)
        const deleteCustomer = customer.filter(({ _id }) => _id !== id)
        setCustomers(deleteCustomer)
      })
      .catch(e => {
        setAuth(false)
        console.log('Access Denied')
      })
  }

  const handleShowMenu = () => {
    setShowMenu(!menuShow)
    if (optionsFilter) setOptionsFilter(false)
  }

  const handleFilterOptions = () => {
    setOptionsFilter(!optionsFilter)
    if (menuShow) setShowMenu(false)
  }

  return user.rol.includes('admin') && isAuth && user
    ? <div className='w-full sm:px-20 px-5'>
      <div className='w-full flex-col min-h-[90vh] relative flex justify-center'>
        {
          menuShow ? <ModalAddCustomer handleShowMenu={handleShowMenu} handleChange={handleChange} handleAddCutomer={handleAddCutomer} /> : null
        }
        <div className='flex py-3 justify-between items-center'>
          <h3 className='text-2xl text-[#252525] font-semibold' style={{ lineHeight: 1 }}>Customers</h3>
          <div className='relative'>
            {
            optionsFilter ? <MenuFilter setCustomers={setCustomers} setOptionsFilter={setOptionsFilter} /> : null
           }
            <button className='text-2xl bg-blue-400 hover:bg-blue-200 transition-[background-color] text-white p-[6px] mr-2 rounded-xl' onClick={() => window.location.reload()}><BiRefresh /></button>
            <button className='text-2xl bg-amber-300 hover:bg-amber-200 transition-[background-color] text-white p-[6px] mr-2 rounded-xl' onClick={() => handleFilterOptions()}><BiFilterAlt /></button>
            <button className='text-2xl bg-green-400 hover:bg-green-300 transition-[background-color] text-white p-[6px] rounded-xl' onClick={() => handleShowMenu()}><AiOutlineUserAdd /></button>
          </div>
        </div>
        <ListCustomer customer={customer} handleDeleteCustomer={handleDeleteCustomer} />
      </div>
      </div>
    : null
}
