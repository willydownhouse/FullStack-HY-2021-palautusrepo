export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: id,
  };
};

const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    data: {
      id: getId(),
      votes: 0,
      content,
    },
  };
};

export const showNotification = (message) => {
  return {
    type: "SHOW_NOTIFICATION",
    data: message,
  };
};

export const hideNotification = () => {
  return {
    type: "HIDE_NOTIFICATION",
  };
};

export const filter = (filterText) => {
  return {
    type: "FILTER",
    data: filterText,
  };
};
