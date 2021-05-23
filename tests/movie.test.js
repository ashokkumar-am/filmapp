const { italic } = require('chalk');
const request = require('supertest');
const app = require('../app');
const movie = require('../models/movie');


beforeEach(async () => {
    // await user.deleteMany({})
    // await user(user).save();
    console.log('before each log testing')
})


test(`Should display the movie list`, async () => {
    await request(app).get('/api/v1/movie/list')
        .expect(200)
})

test('OK Creating a new movie', (done) => {
    request(app).post('/api/v1/movie/add')
        .send({ name: 'Movie Name', description: 'movei description' })
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('description');
        })
})