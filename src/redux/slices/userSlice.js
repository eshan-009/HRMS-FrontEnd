import { createSlice } from "@reduxjs/toolkit";
const initialState  = {
    name : localStorage.getItem("USER") && JSON.parse(localStorage.getItem("USER")).name ? JSON.parse(localStorage.getItem("USER")).name : "" ,
    role : localStorage.getItem("USER") && JSON.parse(localStorage.getItem("USER")).role ? JSON.parse(localStorage.getItem("USER")).role : "",
    profilePicture : localStorage.getItem("USER") && JSON.parse(localStorage.getItem("USER")).profilePicture ? JSON.parse(localStorage.getItem("USER")).profilePicture : ""
}
const userSlice = createSlice({
    name : "User",
    initialState : initialState ,
    reducers : {
        setName : (state,action)=>{
          
            state.name = action.payload
        },
        setRole : (state,action)=>{
          
            state.role = action.payload
        },
        setProfilePicture :(state,action)=>{
       
            state.profilePicture = action.payload
        }
    } 
})

export const {setName,setRole,setProfilePicture} = userSlice.actions
export default userSlice.reducer