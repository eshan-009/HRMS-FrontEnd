import React, { useEffect } from 'react'
import LoginForm from '../components/authComponents/LoginForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAsideTabs } from '../services/operations/AsideBar'
import NavBar from '../components/NavBar/NavBar'
import Avisoft from '../assets/Avisoft.svg';


const LoginPage = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state)=>state.Auth.isLoggedIn)

 
  useEffect(()=>{
    if(isLoggedIn)
    {
      navigate("/home")
    }
  },[])
  const Theme = useSelector((state)=>state.Theme.theme)
  return(
    <div className={`h-[90vh] ${Theme == "Dark" ?"bg-slate-700 text-white" : ""}`}>
      <div className='flex items-center flex-col w-full  text-red-600'>
<p><b>Email</b> : dummy@dummy.com</p>
<p><b>Password</b> : dummy$9A</p>
</div>
     {/* <div className='flex  mt-20 justify-center gap-4'>
         <div>
      <img className="h-32 w-32 p-2" src={Avisoft} alt="Avi Logo" />
       <h3 className='font-serif font-bold text-2xl'> Sign-In Portal</h3>
        </div>
       </div> */}
     <div className='flex justify-center p-4 '>
       { !isLoggedIn && <LoginForm/> }
     </div>
    </div>
  )
  

}

export default LoginPage
