const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  await User.create({
    username: 'kari',
    password: 'test1234',
  });
});

const login = async () => {
  const token = await api
    .post('/api/users/login')
    .set('Content-type', 'application/json')
    .send({ username: 'kari', password: 'test1234' });

  return token.body;
};

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
/////////////////////////////////////////////////////////////////7
describe('valid new blog is added', () => {
  test('bloglist length grows by 1', async req => {
    const response = await login();

    const { user, token } = response;

    const newBlog = {
      title: 'Blog 3',
      author: 'bond',
      url: 'dsda',
      user: {
        username: user,
      },
    };

    await api
      .post('/api/blogs')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const res = await api.get('/api/blogs');

    expect(res.body.data).toHaveLength(helper.initialBlogs.length + 1);

    console.log('valid new blog is added');
    console.log(res.body.data);
  });
});

describe('if blog has no likes field -> default it to 0', () => {
  test('lets test it', async () => {
    const newBlog = {
      title: 'Cool Blog',
      author: '6114e9397c6dfd0db46c5f72',
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
