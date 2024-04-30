import { SET_USER, CLEAR_USER, LOG_IN, LOG_OUT } from "./action";

const initialState = {
    user: null,
    isLoggedIn: false,
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            const serializedUser = serializeUser(action.payload);
            return { ...state, user: serializedUser};
        case CLEAR_USER:
            return { ...state, user: null};
        case LOG_IN:
            return {...state, isLoggedIn: true};
        case LOG_OUT:
            return { ...state, isLoggedIn: false};
        default:
            return state;
    }
}

function serializeUser(user) {
    return {
        name: user.name,
        birthdate: user.birthdate,
        email: user.email,
        gender: user.gender,
        locale: user.locale,
    }
}

export default rootReducer;