import React from 'react'
import { useSelector } from 'react-redux'

const AssignmentButton = ({onClick,buttonText}) => {
    const Theme = useSelector((state)=>state.Theme.theme)
  return (
    <button
    onClick={onClick}
    className={`p-2 rounded-lg hover:scale-95 min-w-24 ${Theme=="Dark" ? buttonText=="UnAssign" ? "bg-red-500 text-gray-200" : "bg-yellow-500 text-black" : buttonText=="UnAssign" ? "bg-red-500 text-gray-200" :"bg-yellow-400 text-black"}  `} >
    {buttonText}
       </button>
  )
}

export default AssignmentButton
