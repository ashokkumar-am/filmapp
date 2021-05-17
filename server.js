// SERVER.js

const app = require('./app');
const port = process.env.port || 4000;

app.listen(port, () => {
    console.log(`Filmy App Server listening at http://localhost:${port}`);
});