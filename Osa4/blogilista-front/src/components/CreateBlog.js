import React, { useState } from 'react';

import blogsApi from '../apis/blogsApi';
import CreateBlogForm from './CreateBlogForm';

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
        err.response.data.error
          ? setErrMessage(err.response.data.error)
          : setErrMessage(err.response.data.message);
        setTimeout(() => setErrMessage(null), 5000);
      });
  };
  return (
    <>
      <h1 className="ui header">Create a new blog</h1>
      <CreateBlogForm
        label1="Title"
        label2="Author"
        label3="Url"
        btnLabel="Submit"
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        onFormSubmit={onFormSubmit}
      />
      <div className="ui hidden divider"></div>
    </>
  );
};

export default CreateBlog;
