import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Services from "./pages/Services"
import Login from './pages/Login/login'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/services' element={<Services />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App