const initState = {
    authError: null
};

const authReducer = ( state = initState, action) =>{

    switch(action.type){
        case 'LOGIN_ERROR':
            console.log("login failed");
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGIN_SUCCESS':
            console.log('login successfull');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log("signup failed");
            return {
                ...state,
                authError: action.err.message
            }
        case 'LOGOUT_SUCCESS':  
            console.log("logout done");
            return {
                state
            }
        case 'SIGNUP_SUCCESS':
            console.log('signup successfull');
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
    
}

export default authReducer;