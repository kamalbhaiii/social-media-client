import { combineReducers } from "redux";
import loginReducer from "./Login.reducer";
import signupReducer from "./Signup.reducer";
import forgetPasswordReducer from "./ForgetPassword.reducer";
import verifyEmailReducer from "./VerifyEmail.reducer";

const reducer = combineReducers({
    loginReducer,
    signupReducer,
    forgetPasswordReducer,
    verifyEmailReducer
})

export default reducer;