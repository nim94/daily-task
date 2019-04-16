require('dotenv').config({ path: '.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: [process.env.DEV_URL],
    },
    playground: '/playground',
  },
  (srv) => {
    console.log(`Server is running at http://localhost:${srv.port}`);
    console.log(process.env.DEV_URL);
  }
);