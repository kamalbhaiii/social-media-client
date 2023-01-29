import axios from "axios"
import jwt from "jwt-decode"

export const verifyEmailInitiate = () => ({
    type: "EMAIL_VERIFY_INITIATE"
})

export const verifyEmailSuccess = (message) => ({
    type: "EMAIL_VERIFY_SUCCESS",
    payload: message
})

export const verifyEmailFail = (error) => ({
    type: "EMAIL_VERIFY_FAIL",
    payload: error
})

export const verifyEmailApiCall = (token) => {
    const { id } = jwt(token);
    return (dispatch) => {
        dispatch(verifyEmailInitiate())
        axios.put(`${process.env.REACT_APP_SERVER_URI}/user/verifyAccount/${id}`, {
            emailVerified: true
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "applicaton/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            dispatch(verifyEmailSuccess("Email Verified Successfully."))
        }).catch((err) => {
            dispatch(verifyEmailFail(err.response.data.message))
        })
    }
}