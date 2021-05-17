// SERVER.js

const app = require('./app');

const port = process.env.port;

app.listen(port, () => {
    console.log(`Filmy App Server listening at http://localhost:${port}`);
});