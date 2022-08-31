const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT;

let server;
mongoose
  .connect(process.env.MONGODB_URL, { ignoreUndefined: true })
  .then(() => {
    server = app.listen(port, () => {
      console.log('Server is up on port:', port);
    });
  })
  .catch((e) => {
    console.error('Mongoose Exception:', e);
  });
