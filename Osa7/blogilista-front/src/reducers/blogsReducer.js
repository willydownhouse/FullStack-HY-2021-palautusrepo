const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_BLOGS':
      return action.payload;
    case 'CREATE_BLOG':
      return [...state, action.payload];
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.payload);
    case 'LIKE_A_BLOG':
      return state.map(blog =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    case 'COMMENT_A_BLOG':
      return state.map(blog =>
        blog.id !== action.payload.id
          ? blog
          : { ...blog, comments: [...blog.comments, action.payload.comment] }
      );

    default:
      return state;
  }
};

export default blogsReducer;
