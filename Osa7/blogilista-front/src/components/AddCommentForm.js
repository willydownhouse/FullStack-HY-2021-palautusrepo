import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../actions';

function AddCommentForm({ id }) {
  const [inputVal, setInputVal] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addComment(id, inputVal));
    setInputVal('');
  };
  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="two fields">
        <div className="field">
          <label>Add a comment</label>
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Comment"
            type="text"
            required
          />
        </div>
        <div className="field"></div>
      </div>
      <button type="submit" className="ui submit button">
        Submit
      </button>
    </form>
  );
}

export default AddCommentForm;
