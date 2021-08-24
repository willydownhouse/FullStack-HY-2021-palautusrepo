import anecdotesApi from "../apis/anecdotesApi";

export const getAnecdotes = () => async (dispatch) => {
  const { data } = await anecdotesApi.get("/anecdotes");

  dispatch({
    type: "GET_ANECTODES",
    data,
  });
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const { data } = await anecdotesApi.patch(`/anecdotes/${anecdote.id}`, {
    votes: anecdote.votes + 1,
  });

  dispatch({
    type: "VOTE",
    data,
  });
};

export const createAnecdote = (content) => async (dispatch) => {
  const { data } = await anecdotesApi.post("/anecdotes", {
    content,
    votes: 0,
  });

  dispatch({
    type: "NEW_ANECDOTE",
    data,
  });
};

export const showNotification = (message, time) => (dispatch) => {
  let timerId = window.setTimeout(function () {}, 0);

  while (timerId--) {
    window.clearTimeout(timerId);
  }

  dispatch({
    type: "SHOW_NOTIFICATION",
    data: message,
  });

  setTimeout((id) => {
    dispatch({
      type: "HIDE_NOTIFICATION",
    });
  }, time * 1000);
};

export const filter = (filterText) => {
  return {
    type: "FILTER",
    data: filterText,
  };
};
