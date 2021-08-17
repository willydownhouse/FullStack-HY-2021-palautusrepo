import React, { useState } from 'react';

import blogsApi from '../apis/blogsApi';

const CreateBlog = ({
  token,
  blogs,
  setBlogs,
  setErrMessage,
  setNotification,
  setVisible,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();

    blogsApi
      .post(
        '/api/blogs',
        {
          title,
          author,
          url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        setBlogs([...blogs, res.data.newBlog]);
        setNotification(`${res.data.newBlog.title} added to the blogs list.
        `);

        setTitle('');
        setAuthor('');
        setUrl('');

        setTimeout(() => {
          setNotification(null);
          setVisible(false);
        }, 2500);
      })
      .catch(err => {
        setErrMessage(err.response.data.message);
        setTimeout(() => setErrMessage(null), 5000);
      });
  };
  return (
    <>
      <h1 className="ui header">Create a new blog</h1>

      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            name="title"
            placeholder="Title"
          />
        </div>
        <div className="field">
          <label>Author</label>
          <input
            value={author}
            onChange={e => setAuthor(e.target.value)}
            type="text"
            name="author"
            placeholder="Author"
          />
        </div>
        <div className="field">
          <label>Url</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            type="text"
            name="url"
            placeholder="url"
          />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
      <div className="ui hidden divider"></div>
    </>
  );
};

export default CreateBlog;
