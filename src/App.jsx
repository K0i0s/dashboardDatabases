import AppRouter from './routers/router'
import { useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './layout/Navbar/Navbar'
import MainContainer from './components/MainContainer'
import Login from './pages/Login'


function App({children}) {
  const location = useLocation()

  const mostrarNavbar = location.pathname !== '/login' && location.pathname !== '/register'

  return (
    <>
      {mostrarNavbar && <Navbar/>}
      <AppRouter/>
    </>
  )
}

export default App
