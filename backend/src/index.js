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

// server.get("*", (req, res) => {
//   // Use your own logic here to know if the user is loggedIn or not
//   const token = req.cookies["token"]
//   token && handle(req, res)
// })