
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/home/Homepage'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import {Toaster} from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from './ContextApi/AuthContext'


function App() {
  const {authUser}=useContext(AuthContext)

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/'  element={authUser ? <Homepage/>:<Navigate to={"/signup" } />}  />
      <Route  path='/signup'  element={authUser ? <Navigate to="/"/>:<Signup/>}  />
      <Route  path='/login' element={authUser ? <Navigate to="/"/>:<Login/>}  />
    </Routes>
     <Toaster/>
    </div>
  )  
}

export default App
