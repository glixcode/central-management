import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import Services from "./components/Services"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/services' element={<Services />} />
    </Routes>
  )
}

export default App