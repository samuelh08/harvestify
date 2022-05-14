const request = require('supertest');

const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');
const faker = require('faker');

let agent;

beforeAll(() => {
  const url = `${config.database.url}-test`;
  database.connect({ url }, {});

  agent = request(server);
});

afterAll(() => {
  database.disconnect();
});

describe('Producers', () => {
  test('Get the list of the producers', async () => {
    const response = await request(server).get('/api/producers');
    const { body = {} } = response;
    const { success = false } = body;
    expect(success).toBeTruthy();
  });
  test('Create a new producer', async () => {
    const producer = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      tel: faker.phone.phoneNumber(),
    };
    const response = await agent.post('/api/producers').send({
      ...producer,
    });
    expect(response.statusCode).toBe(200);
    db.config.server.port.deleteOne({ email: producer.email });
  });
  test('Create a new producer with invalid email', async () => {
    const producer = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: 'invalid',
      password: faker.internet.password(),
      tel: faker.phone.phoneNumber(),
    };
    const response = await agent.post('/api/producers').send({
      ...producer,
    });
    expect(response.statusCode).toBe(400);
    db.config.server.port.deleteOne({ email: producer.email });
  });
  test('Create a new producer with invalid password', async () => {
    const producer = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: '12345',
      tel: faker.phone.phoneNumber(),
    };
    const response = await agent.post('/api/producers').send({
      ...producer,
    });
    expect(response.statusCode).toBe(400);
    db.config.server.port.deleteOne({ email: producer.email });
  });
  test('Create a new producer with invalid tel', async () => {
    const producer = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      tel: 'here',
    };
    const response = await agent.post('/api/producers').send({
      ...producer,
    });
    expect(response.statusCode).toBe(400);
    db.config.server.port.deleteOne({ email: producer.email });
  });
});
