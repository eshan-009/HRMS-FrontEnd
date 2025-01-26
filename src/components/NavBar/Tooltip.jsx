import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const Tooltip = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className='absolute  top-11 right-16 bg- max-w-1/6 flex flex-col items-center  '>
    <div className={`w-7 h-7 mb-2 bg-slate-400 rotate-45 translate-y-6 z-40 `}></div>
    <div className=' bg-slate-400 p-5 w-full rounded-lg flex flex-col items-start justify-center z-50'>
      <p className='flex gap-2 items-center'><VscDashboard />DashBoard</p>
      <p 
      onClick={(e)=>{
        e.preventDefault()
        
        dispatch(setLoggedIn(false))
        localStorage.clear()
        navigate("/login")
      }}
      className='flex gap-2 items-center'><IoLogOutOutline />Log Out</p>
      </div>
    </div>
  )
}

export default Tooltip
