import request from 'supertest';
import app from '../app';
import User from '../models/User';
import Expense from '../models/Expense';
import mongoose from 'mongoose';

let authToken;
let testUser;

beforeEach(async () => {
  await User.deleteMany();
  await Expense.deleteMany();

  testUser = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpass123',
    mobile: '1234567890'
  });
  await testUser.save();

  const response = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'test@example.com',
      password: 'testpass123'
    });

  authToken = response.body.token;
});

test('Should create new expense', async () => {
  await request(app)
    .post('/api/expenses')
    .set('Authorization', `Bearer ${authToken}`)
    .send({
      amount: 100,
      description: 'Test Expense',
      splitMethod: 'equal',
      splits: [{ user: testUser._id }]
    })
    .expect(201);
});

test('Should get user expenses', async () => {
  const response = await request(app)
    .get('/api/expenses')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  expect(Array.isArray(response.body)).toBeTruthy();
});