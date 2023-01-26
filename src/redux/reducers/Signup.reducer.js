const initialState = {
    error: null,
    loading: null,
    message: ""
}

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGNUP_INITIALIZE":
            return {
                ...state,
                loading: true
            }
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case "SIGNUP_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return initialState
    }
}

export default signupReducer;