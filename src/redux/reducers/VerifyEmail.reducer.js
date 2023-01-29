const initialState = {
    loading: null,
    message: null,
    error: null
}

const verifyEmailReducer = (state = initialState, action) => {
    switch (action.type) {
        case "EMAIL_VERIFY_INITIATE":
            return {
                ...initialState,
                loading: true
            }
        case "EMAIL_VERIFY_SUCCESS":
            return {
                ...initialState,
                loading: false,
                message: action.payload
            }
        case "EMAIL_VERIFY_FAIL":
            return {
                ...initialState,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default verifyEmailReducer;