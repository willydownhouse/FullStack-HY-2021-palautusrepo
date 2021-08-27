const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...action.payload, isLoggedIn: true };

    case 'LOG_OUT':
      return { isLoggedIn: false };

    case 'SET_CURRENT_USER':
      return { ...action.payload, isLoggedIn: true };
    default:
      return state;
  }
};

export default authReducer;
