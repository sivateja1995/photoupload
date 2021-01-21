const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    path:{
        type:String
    },
    filename:{
        type:String
    },
    originalname:{
        type:String
    },
    username:{
        type:String,
        unique:true,
        required:true
    }

})
const filesCollection = mongoose.model('filesCollection',fileSchema,'filesCollection');
module.exports = filesCollection;
