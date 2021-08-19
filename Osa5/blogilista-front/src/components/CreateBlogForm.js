import React from 'react';

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
      <button className="ui button" type="submit">
        {btnLabel}
      </button>
    </form>
  );
};

export default CreateBlogForm;
