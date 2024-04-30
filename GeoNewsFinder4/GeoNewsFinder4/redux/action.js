export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const logIn = () => {
  return {
    type: LOG_IN,
  };
};

export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};