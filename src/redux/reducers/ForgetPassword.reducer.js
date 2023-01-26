const initialState = {
    loading: null,
    message: null,
    error: null
}

const forgetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FORGET_PASSWORD_INITIATE":
            return {
                ...initialState,
                loading: true
            }
        case "FORGET_PASSWORD_SUCCESS":
            return {
                ...initialState,
                loading: false,
                message: action.payload
            }
        case "FORGET_PASSWORD_FAIL":
            return {
                ...initialState,
                loading: false,
                error: action.payload
            }
        case "FORGET_PASSWORD_REMOVE_DATA":
            return initialState
        case "RESET_PASSWORD_REMOVE_DATA":
            return initialState
        default:
            return initialState;
    }
}

export default forgetPasswordReducer;