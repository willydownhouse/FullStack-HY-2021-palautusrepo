const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const User = require('../models/userModel');

beforeEach(async () => {
  await User.deleteMany();
  await User.insertMany(helper.initialUsers);
});

describe('Dont create users with wrong data and OK error messages', () => {
  test('Username less than 3 characters', async () => {
    const newUser = {
      username: 'sa',
      password: 'test1234',
    };

    const res = await api.post('/api/users').send(newUser).expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe(
      'User validation failed: username: Path `username` (`sa`) is shorter than the minimum allowed length (3).'
    );
  });

  test('Password less than 3 characters', async () => {
    const newUser = {
      username: 'saaaaa',
      password: 'te',
    };

    const res = await api.post('/api/users').send(newUser).expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe(
      'User validation failed: password: Path `password` (`te`) is shorter than the minimum allowed length (3).'
    );
  });

  test('Same username not allowed', async () => {
    const newUser = {
      username: 'kari',
      password: 'test1234',
    };

    const res = await api.post('/api/users').send(newUser).expect(400);

    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe(
      'User validation failed: username: Error, expected `username` to be unique. Value: `kari`'
    );
  });

  test('When all should be good', async () => {
    const newUser = {
      username: 'willy',
      password: 'test1234',
    };

    await api.post('/api/users').send(newUser).expect(201);

    const res = await api.get('/api/users');

    expect(res.body.users).toHaveLength(helper.initialUsers.length + 1);
  });
});

describe('Login OK', () => {
  test('failure if no username and password -> 400', async () => {
    const reqBody = {};

    const res = await api.post('/api/users/login', reqBody).expect(400);

    expect(res.body.message).toBe('Please enter username and password');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
