// SERVER.js

const app = require('./app');


app.listen(process.env.port || 4000, () => {
    console.log(`Filmy App Server listening at http://localhost:${port}`);
});