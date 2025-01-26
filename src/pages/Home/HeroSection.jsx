import React from 'react'
import { useSelector } from 'react-redux'

const HeroSection = () => {
      const Theme = useSelector((state) => state.Theme.theme);
    const user = useSelector((state)=>state.User)
  return (
    <div className={` border ${Theme=="Dark" ? "bg-slate-800 text-white" : " bg-gray-100 "} border-gray-300 rounded-lg p-6 shadow-sm mt-10`}>
    <h1 className={`font-bold ${Theme=="Dark" ? " text-white" : " text-gray-800 "}  text-5xl mb-4`}>
      Welcome to Your HRMS Dashboard
    </h1>
    <p className={` ${Theme=="Dark" ? " text-gray-300" : " text-gray-800 "}  mb-6 text-3xl`}>
      Manage employees, track performance, and more.
    </p>
    <div className={`  ${Theme=="Dark" ? "bg-slate-700 text-white" : " bg-white "} border border-gray-200 rounded-lg p-4 shadow-md`}>
      <h2 className={`font-semibold ${Theme=="Dark" ? " text-white" : " text-gray-700 "} mb-10 text-3xl`}>
        Profile 
      </h2>
    <div className=" flex max-md:flex-col max-md:gap-10 gap-20 items-center  text-2xl">
    <div className="border border-black  h-40 w-40 object-cover rounded-full flex justify-center  overflow-hidden">
        <img  src={user?.profilePicture}/>
      </div>
      <div>
      <ul className={`${Theme=="Dark" ? " text-white" : " text-gray-800 "} max-md:text-lg`}>
        <li>
          <strong>Username:</strong> {user?.name}
        </li>
        <li>
          <strong>Designation:</strong> {user?.role}
        </li>

      </ul>
      </div>
    
    </div>
    </div>
  </div>
  )
}

export default HeroSection
