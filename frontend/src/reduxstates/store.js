import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./loginslice"
const store = configureStore({
    reducer:{
        user:userReducer
    }

})

export default store;