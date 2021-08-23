const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return action.data;
    case "HIDE_NOTIFICATION":
      return null;

    default:
      return state;
  }
};

export default notificationReducer;
