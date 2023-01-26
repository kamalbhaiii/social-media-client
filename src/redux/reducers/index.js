import { combineReducers } from "redux";
import loginReducer from "./Login.reducer";
import signupReducer from "./Signup.reducer";
import forgetPasswordReducer from "./ForgetPassword.reducer";

const reducer = combineReducers({
    loginReducer,
    signupReducer,
    forgetPasswordReducer
})

export default reducer;