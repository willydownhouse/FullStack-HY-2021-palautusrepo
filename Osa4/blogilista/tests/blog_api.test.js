const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blogModel');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('bloglist length', () => {
  test('bloglist length is equal', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body.data.length).toEqual(helper.initialBlogs.length);
  });
});

describe('blog has a field named id', () => {
  test('bloglist has id field', async () => {
    const res = await api.get('/api/blogs');

    res.body.data.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('valid new blog is added', () => {
  test('bloglist length grows by 1', async () => {
    const newBlog = {
      title: 'Great blog',
      author: 'Jaakko Parantainen',
      url: 'dsda',
    };

    await api.post('/api/blogs').send(newBlog).expect(201);

    const res = await api.get('/api/blogs');

    expect(res.body.data).toHaveLength(helper.initialBlogs.length + 1);

    const blogs = res.body.data.map(blog => {
      return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
      };
    });

    expect(blogs).toContainEqual(newBlog);
  });
});

describe('if blog has no likes field -> default it to 0', () => {
  test('lets test it', async () => {
    const newBlog = {
      title: 'Cool Blog',
      author: 'Pena',
      url: 'asA',
    };

    await api.post('/api/blogs').send(newBlog).expect(201);

    const res = await api.get('/api/blogs');

    res.body.data.forEach(blog => {
      expect(blog.likes).toBeDefined();
    });
  });
});

describe('POST, new blog must contain title and url, if not -> 400 Bad Request', () => {
  test('lets test this', async () => {
    const newBlog = {
      author: 'life is',
    };

    const res = await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('delete a blog', () => {
  test('succeed with status code 204', async () => {
    const res = await api.get('/api/blogs');

    const id = res.body.data[0].id;

    await api.delete(`/api/blogs/${id}`).expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
