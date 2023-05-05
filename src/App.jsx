import RouterApp from './Router'
import ContextProviderAuth from './context/AuthContext'

function App () {
  return (
    <ContextProviderAuth>
      <RouterApp />
    </ContextProviderAuth>
  )
}

export default App
