import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextConsumerAuth } from '../../context/AuthContext'

const menuSettings = [
  {
    option: 'Mi cuenta',
    logOut: false
  },
  {
    option: 'Opciones',
    logOut: false
  },
  {
    option: 'LogOut',
    logOut: true
  }
]

export default function MenuUser ({ menuUserShow }) {
  const { user, setUser } = ContextConsumerAuth()
  const navigate = useNavigate()

  const logOutFunction = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('SESSION_ID')
    return navigate('/login')
  }

  return (
    <div className={`absolute  ${menuUserShow ? 'top-[63px]' : '-top-full'} sm:right-10 right-5 bg-[#262E52] text-white z-10 transition-[top] min-h-[250px] flex flex-col justify-center min-w-[210px] px-5 rounded-b-md`}>
      <div>
        <div className='w-[85px] h-[85px] rounded-full overflow-hidden mb-3'>
          <img src={user.image} alt={`image user ${user.surname}`} />
        </div>
      </div>
      <ul className='flex flex-col'>
        {
            menuSettings.map(({ option, logOut }) => <li key={option} className='text-[15px] mb-2 font-medium'>
              {logOut ? <a href='#' onClick={(e) => logOutFunction(e)}>{option}</a> : <a href='#'>{option}</a>}
                                                     </li>)
        }
      </ul>
    </div>
  )
}
