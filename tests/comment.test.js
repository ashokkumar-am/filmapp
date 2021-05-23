const request = require('supertest');
const app = require('../app')
const comment = require('../models/movieComments');

// var data = {
//     userId: 'ashoka',
//     comment: 'first comment',
//     movieId: '123123123'
// }
beforeEach(async () => {
    // await comment.deleteMany({})
    // await comment(comment).save();
    console.log('before each log testing for Comment Section');
})

test(`Should add the movie comment`, async () => {
    const response = await (await request(app).post('/api/v1/movie/add/comment'))
        .send({
            userId: "userId",
            movieId: "movieId",
            comment: "comment"
        })
        .expect(400)

});