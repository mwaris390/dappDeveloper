import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"userData",
    initialState: {id:"",name:"",role:"",jwt:""},
    reducers:{
        setUser:(state,action)=>{
            return {
                ...state,
                ...action.payload
            }
        },
        clearUser:(state,action)=>{
            return{
                ...state,
                ...action.payload
            }
        }
    }
})
export const {setUser,clearUser} = userSlice.actions;
export default userSlice.reducer