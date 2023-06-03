const request = require('supertest');
const app = require('../index');

describe('Reservations', () => {

  it('returns a list of Reservations', async () => {
    const response = await request(app).get('/Reservations');
    expect(response.status).toBe(200);
  });

  it('returns the suggested planning', async () => {
    const Reservation_List = {
      "list":
        [
          { "Name": "Réunion 1", "StartTime": 9, "EndTime": 10, "meeting_type": "VC", "Nbr_participants": 8 },
          { "Name": "Réunion 2", "StartTime": 9, "EndTime": 10, "meeting_type": "VC", "Nbr_participants": 6 },
          { "Name": "Réunion 3", "StartTime": 11, "EndTime": 12, "meeting_type": "RC", "Nbr_participants": 4 },
          { "Name": "Réunion 4", "StartTime": 11, "EndTime": 12, "meeting_type": "RS", "Nbr_participants": 2 },
          { "Name": "Réunion 5", "StartTime": 11, "EndTime": 12, "meeting_type": "SPEC", "Nbr_participants": 9 },
        ]
      ,
      "Date": "2023-06-01"
    }
    const response = await request(app)
      .post('/Reservations/Suggest-Reservations')
      .send(Reservation_List);

    expect(response.status).toBe(200);
  });

  it('should create a new Reservation', async () => {
    const  Reservation = {
      "Name": "Reunion",
      "Nbr_participants": 2,
      "Date":"2023-06-01",
      "StartTime":17,
      "EndTime":18,
      "meeting_type":"VC"
      };
    const response = await request(app)
      .post('/Reservations')
      .send(Reservation);

    expect(response.status).toBe(201);
  });

  it('should retrieve a specific Reservation by name', async () => {
    const name = 'Reunion';
    const response = await request(app).get(`/Reservations/ByName/${name}`);
    expect(response.status).toBe(200);
  });

  it('should delete a specific Reservation by name', async () => {
    const name = 'Reunion';
    const response = await request(app).delete(`/Reservations/ByName/${name}`);
    expect(response.status).toBe(200);
  });

});
