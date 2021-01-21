const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT;
require('./db/db');


app.listen(PORT,()=>{
  console.log(`port is  up on ${PORT}`)
})
