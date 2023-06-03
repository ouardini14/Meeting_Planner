const request = require('supertest');
const app = require('../index');

describe('Rooms', () => {
  it('returns a list of rooms', async () => {
    const response = await request(app).get('/Rooms');
    expect(response.status).toBe(200);
  });

  it('should create a new room', async () => {
    const  room = {
      "Name": "E999",
      "Capacity": 50,
      "Tools": ["Ecran","tableau","Pieuvre"]   
    };
    const response = await request(app)
      .post('/Rooms')
      .send(room);

    expect(response.status).toBe(201);
  });

  it('should retrieve a specific room by name', async () => {
    const name = 'E20';
    const response = await request(app).get(`/Rooms/ByName/${name}`);
    expect(response.status).toBe(200);
  });

  it('should delete a specific room by name', async () => {
    const name = 'E20';
    const response = await request(app).delete(`/Rooms/ByName/${name}`);
    expect(response.status).toBe(200);
  });

});
