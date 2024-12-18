import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import asideReducer from "./slices/asideSlice";
import attributeReducer from "./slices/attributeSlice";
import themeReducer from "./slices/themeSlice";
import refresh from "./slices/refreshSlice";

export const store = configureStore({
reducer :{
    Auth : authReducer,
    User : userReducer,
    Aside : asideReducer,
    Attribute : attributeReducer,
    Theme : themeReducer,
    Refresh : refresh
}
})