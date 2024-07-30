import request from 'supertest';
import app from '../app';
import User from '../models/User';


beforeEach(async () => {
    await User.deleteMany();
  });
  
  test('Should signup a new user', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpass123',
        mobile: '1234567890'
      })
      .expect(201);
  });
  
  test('Should login existing user', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpass123',
      mobile: '1234567890'
    });
    await user.save();
  
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'testpass123'
      })
      .expect(200);
  
    expect(response.body.token).not.toBeNull();
  });