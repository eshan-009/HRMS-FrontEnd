import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
    name : "Refresh",
    initialState : {
        count: 1
    },
    reducers : {
        refreshState : (state)=>{

            if(state.count<10)
            {
             state.count++
            }
            else
            {
                state.count = 1
            }
           console.log(state)
        }
    }
})

export const {refreshState} = refreshSlice.actions
export default refreshSlice.reducer