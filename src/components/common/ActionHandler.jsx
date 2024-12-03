import React from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
const ActionHandler = ({editHandler,deleteHandler}) => {
    const Theme = useSelector((state)=>state.Theme.theme)
  return (
    <div className='flex items-center gap-3'>
   
    <FiEdit 
    className={` hover:scale-150 ${Theme=="Dark" ? "text-blue-300" : "text-blue-300"}`}
   onClick={editHandler}
   />
   <MdDelete
   className='text-red-500 hover:scale-150'
   onClick={deleteHandler}
   />
    </div>
  )
}

export default ActionHandler
