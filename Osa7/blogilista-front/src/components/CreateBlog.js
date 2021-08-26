import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotification, hideNotification } from '../actions';

import { createBlog } from '../actions';

import CreateBlogForm from './CreateBlogForm';

const CreateBlog = ({ token, setVisible }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(
      createBlog(
        {
          title,
          author,
          url,
        },
        token
      )
    );
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
