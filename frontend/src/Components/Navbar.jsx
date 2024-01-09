import React from 'react'
import style from '../Styles/Navbar.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleNavigate = () => {
    if(token){
      navigate('/form')
    }else{
      alert('Please Login First!')
    }
  }

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token")
      alert('Logged out successfully')
      navigate("/")
    }
    else{
      alert('You can start by logging in below!')
    }
  }
  return (
    <div className={style.navbar}>
      <h3 onClick={handleNavigate}>Kryzen</h3>

      <button onClick={handleLogout}>{token ? 'Logout' : 'Hi, there'}</button>
    </div>
  )
}

export default Navbar