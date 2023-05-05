import { createContext, useContext, useState } from 'react'
const AuthContext = createContext()

export default function ContextProviderAuth ({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function ContextConsumerAuth () {
  const data = useContext(AuthContext)
  return data
}
