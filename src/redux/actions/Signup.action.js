import axios from "axios"

export const signupInitialization = () => ({
    type: "SIGNUP_INITIALIZE"
})

export const signupSuccess = (message) => ({
    type: "SIGNUP_SUCCESS",
    payload: message
})

export const signupFail = (error) => ({
    type: "SIGNUP_FAIL",
    payload: error
})

export const resetData = () => {
    return (dispatch) => {
        dispatch({
            type: "RESET_SIGNUP_FORM_DATA"
        })
    }
}

export const signupApiCall = (body) => {
    return (dispatch) => {
        dispatch(signupInitialization())
        axios.post(`${process.env.REACT_APP_SERVER_URI}/auth/signup`, body, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            dispatch(signupSuccess(res.data.message))
        }).catch((err) => {
            dispatch(signupFail(err.response.data.message))
        })
    }
}