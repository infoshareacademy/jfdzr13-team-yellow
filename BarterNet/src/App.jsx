import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import UserHomePage from './components/UserHomePage/UserHomePage'
import PrivateRoute from './utils/PrivateRoute'

function App() {

  return (
  <Routes>
    <Route path='/' element={<Layout />}>
      <Route path='login' element={<Login />}/>
      <Route path='register' element={<Register />} />
      <Route path='/' element={<PrivateRoute />}>
        <Route index element={<UserHomePage />}/>
        {/* Tutaj dodamy kolejne routy dla zalogowanych userów  */}
      </Route>
      <Route path='*' element={<Navigate to={'/'} />} /> 
    </Route>
  </Routes>
    
  )
}

export default App
