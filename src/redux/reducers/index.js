import { combineReducers } from "redux";
import loginReducer from "./Login.reducer";
import signupReducer from "./Signup.reducer";

const reducer = combineReducers({
    loginReducer,
    signupReducer
})

export default reducer;