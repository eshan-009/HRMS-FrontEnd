import { setAccessList } from "../../redux/slices/asideSlice";
import { apiConnector } from "../apiConnector";
import { Access_EndPoints } from "../apis";

const {GET_FULL_ACCESS_LIST} = Access_EndPoints

export const getFullAccessList = ()=>{
    return async(dispatch)=>{
        try{
           
            const token = localStorage.getItem("token")
            const response = await apiConnector("GET",GET_FULL_ACCESS_LIST,{},{
                "Content-type": "application/json; charset=UTF-8",
                "Authorization" : `Bearer ${token}`
            })

          

            if(response.data.success)
            {
                dispatch(setAccessList(response.data.data[0].accessList))
            }
        } catch(err){
            console.log(err)
        }
    }
}