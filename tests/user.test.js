const request = require('supertest');
const app = require('../app');
const user = require('../models/user');


var data = {
    usernname: "rajesh",
    email: "rajesh@gemini.com",
    password: "chennaidubai"
};

beforeEach(async () => {
    // await user.deleteMany({})
    // await user(user).save();
    console.log('before each log testing')
})

test(`Should sign up for a user`, async () => {
    const response = await request(app).post('/api/v1/user/signup')
        .send({
            'name': data.usernname,
            "email": data.email,
            "password": data.password
        })
        .expect(response.statusCode).toBe(200);
})

test(`Should Login for a user`, async () => {
    await request(app).post('/api/v1/user/login')
        .send({
            email: 'ashok',
            password: 'test1234'
        })
        .expect(400)
})

it('tests error with async/await', async () => {
    expect.assertions(1);
    try {
        await user.getUserName(1);
    } catch (e) {
        expect(e).toEqual({
            error: 'User with 1 not found.',
        });
    }
});
