const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
  await User.create({
    username: 'kari',
    password: 'test1234',
  });
});

let token;
test('Log in to get token', async () => {
  const res = await api
    .post('/api/users/login')
    .set('Content-type', 'application/json')
    .send({ username: 'kari', password: 'test1234' });

  token = res.body.token;

  expect(token).toBeDefined();
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
//tästä herjaa että kestää liian pitkään vaikka tulos OK! Exceeded timeout of 5000 ms for a test
describe('valid new blog is added', () => {
  test('bloglist length grows by 1', async req => {
    const newBlog = {
      title: 'Blog 3',
      author: 'bond',
      url: 'dsda',
    };

    await api
      .post('/api/blogs')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const res = await api.get('/api/blogs');

    expect(res.body.data.length).toBe(helper.initialBlogs.length + 1);
  });
});

describe('if blog has no likes field -> default it to 0', () => {
  test('expect 201 and likes field is defined', async () => {
    const newBlog = {
      title: 'Blog 4',
      author: 'Liisa',
      url: 'asA',
    };

    await api
      .post('/api/blogs')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

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

    const res = await api
      .post('/api/blogs')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe('POST - creading a blog must contain Auth token', () => {
  test('if no token -> 401', async () => {
    const newBlog = {
      title: 'BLog 5',
      author: 'Liisa',
      url: 'asA',
    };

    await api.post('/api/blogs').send(newBlog).expect(401);
  });
});

describe('delete a blog', () => {
  test('Unauthorized 401 if user who did not add the blog is trying to delete it ', async () => {
    const res = await api.get('/api/blogs');

    const id = res.body.data[0].id;

    await api.delete(`/api/blogs/${id}`).expect(401);
  });
  test('Blog deleted succesfully if user is correct ', async () => {
    const res = await api.get('/api/blogs');

    const id = res.body.data[res.body.data.length - 1].id;

    await api
      .delete(`/api/blogs/${id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
