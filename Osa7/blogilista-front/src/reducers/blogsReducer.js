const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_BLOGS':
      return action.payload;
    case 'CREATE_BLOG':
      return [...state, action.payload];
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.payload);
    default:
      return state;
  }
};

export default blogsReducer;
