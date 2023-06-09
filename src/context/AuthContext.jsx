import { createContext, useContext, useState } from 'react'
const AuthContext = createContext()

export default function ContextProviderAuth ({ children }) {
  const [user, setUser] = useState(null)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function ContextConsumerAuth () {
  const data = useContext(AuthContext)
  return data
}
