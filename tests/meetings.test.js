const request = require('supertest');
const app = require('../index');

describe('Meetings', () => {
    it('returns a list of Meetings', async () => {
        const response = await request(app).get('/Meetings');
        expect(response.status).toBe(200);
    });

    it('should create a new meeting', async () => {
        const meeting = {
            "Name": "New_Type",
            "Capacity": 3,
            "Tools": [ "Tableau","Ecran"],
        };
        const response = await request(app)
            .post('/Meetings')
            .send(meeting);

        expect(response.status).toBe(201);
    });

    it('should retrieve a specific meeting by name', async () => {
        const name = 'New_Type';
        const response = await request(app).get(`/Meetings/ByName/${name}`);
        expect(response.status).toBe(200);
    });

    it('should delete a specific meeting by name', async () => {
        const name = 'New_Type';
        const response = await request(app).delete(`/Meetings/ByName/${name}`);
        expect(response.status).toBe(200);
    });

});
