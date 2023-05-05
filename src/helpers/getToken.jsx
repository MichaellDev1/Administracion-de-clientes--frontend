import { useState, useEffect } from 'react'
import { ContextConsumerAuth } from '../context/AuthContext'

export function getToken () {
  return window.localStorage.getItem('SESSION_ID')
}

export function checkToken () {
  const [isSession, setSession] = useState(false)
  const { setUser } = ContextConsumerAuth()

  useEffect(() => {
    if (getToken()) {
      setSession(true)
      const userData = async () => {
        const fetchingUser = await fetch('http://localhost:4000/auth/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              window.localStorage.removeItem('SESSION_ID')
              return setSession(false)
            }
            setUser(data)
            setSession(true)
          })
          .catch((e) => {
            window.localStorage.removeItem('SESSION_ID')
            setSession(false)
          })
        return fetchingUser
      }
      userData()
    }
  }, [])

  return { isSession, setSession }
}
