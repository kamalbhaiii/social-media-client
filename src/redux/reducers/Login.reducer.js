const initialData = {
    token: "",
    error: null,
    loading: null,
    data: null
}

const loginReducer = (state = initialData, action) => {
    switch (action.type) {
        case "LOGIN_INITIALIZATION":
            return {
                ...state,
                loading: true
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                token: action.payload,
                loading: false
            }
        case "CONVERT_LOGIN_TOKEN":
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "RESET_LOGIN_DATA":
            return initialData
        default:
            return state;
    }
}

export default loginReducer;