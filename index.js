require('dotenv').config({path: __dirname + '/.env'});
const api = require("./app").api;
const apiPort = process.env.API_PORT;
api.listen(apiPort, () => {
    console.log(`your server is running on port ${apiPort}`);
});
process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
    });
