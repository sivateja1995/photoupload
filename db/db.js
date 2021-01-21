const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology: true,
    useCreateIndex:true,
    useNewUrlParser:true,
     
});

