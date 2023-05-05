import React from 'react'
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

export default function MenuUser () {
  const { user, setUser } = ContextConsumerAuth()
  const navigate = useNavigate()

  const logOutFunction = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('SESSION_ID')
    return navigate('/login')
  }

  return (
    <div className='fixed top-[63px] right-0 bg-[#262E52] min-h-[290px] flex flex-col justify-center min-w-[240px] p-8 rounded-bl-md'>
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
