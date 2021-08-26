import React from 'react';
import { useDispatch } from 'react-redux';
import { closeForm } from '../actions';

const CreateBlogForm = ({
  label1,
  label2,
  label3,
  btnLabel,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  onFormSubmit,
}) => {
  const dispatch = useDispatch();

  return (
    <form id="form" onSubmit={onFormSubmit} className="ui form">
      <div className="field">
        <label>{label1}</label>
        <input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="Title"
        />
      </div>
      <div className="field">
        <label>{label2}</label>
        <input
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          type="text"
          name="author"
          placeholder="Author"
        />
      </div>
      <div className="field">
        <label>{label3}</label>
        <input
          id="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          name="url"
          placeholder="url"
        />
      </div>
      <button
        id="btnCreateBlogSubmit"
        className="ui button secondary"
        type="submit"
      >
        {btnLabel}
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          dispatch(closeForm());
        }}
        className="ui button"
      >
        Close form
      </button>
    </form>
  );
};

export default CreateBlogForm;
