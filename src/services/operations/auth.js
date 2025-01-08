import { setLoggedIn } from "../../redux/slices/authSlice"
import { apiConnector } from "../apiConnector"
import { AuthEndpoints } from "../apis"
import { getAsideTabs } from "./AsideBar"
import { getUserById } from "./Employee"

const{LOGIN} = AuthEndpoints


export const login = (email,password,navigate)=>{
   

return async(dispatch)=>{
    const body = {
        email : email,
        password : password
    }

    const response = await apiConnector("POST",LOGIN,body)

    if(response.data.success)
    {
        localStorage.setItem("token",response.data.token)
        
        dispatch(getUserById())
        await dispatch(getAsideTabs(navigate))
        dispatch(setLoggedIn(true))
 
    //   if(asideTabs)
    //   {
    //     navigate("/",{state:{tabData : asideTabs}})
    //   }
        
    }

   
}
}