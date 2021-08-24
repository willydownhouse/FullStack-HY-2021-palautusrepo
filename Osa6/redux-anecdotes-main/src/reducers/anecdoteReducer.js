const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ANECTODES":
      return action.data.sort((a, b) => b.votes - a.votes);
    case "VOTE":
      const list = state.filter((item) => item.id !== action.data.id);

      return [...list, action.data].sort((a, b) => b.votes - a.votes);

    case "NEW_ANECDOTE":
      return [...state, action.data];

    case "FILTER":
      const filteredList = state.filter((item) =>
        item.content.toLowerCase().includes(action.data)
      );

      return filteredList;

    default:
      return state;
  }
};

export default anecdoteReducer;
