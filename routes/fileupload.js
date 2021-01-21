const express  = require('express')
const router = express.Router();
const upload = require('../services/multer');
const fs = require('fs');
const Path = require('path');
const filesCollection = require('../models/files');


router.post('/upload',upload.single('image'),async (req,res,next)=>{
 let obj={};
    try{
       
        obj.originalname=req.file.originalname;
        obj.path=req.file.path;
        obj.filename=req.file.filename;
        obj.username=req.body.vmsName;
          const result = await filesCollection.findOneAndUpdate({username:obj.username},obj,{upsert:true,new:true,rawResult:true})
        res.status(201).json({'success':true,'message':result});
     
    }catch (err){
        console.log(err)
        res.status(500).json({'success':false,'message':err})
    }
})


router.get('/uploaded/pic',async (req,res)=>{
    var mime = {
        html: 'text/html',
        txt: 'text/plain',
        css: 'text/css',
        gif: 'image/gif',
        jpg: 'image/jpeg',
        png: 'image/png',
        svg: 'image/svg+xml',
        js: 'application/javascript'
    };
  
  
    const usernameFilter = req.query.username;
    console.log(usernameFilter)
    const dp = await filesCollection.find({username:usernameFilter})
   console.log(dp)
   try{
    const type = mime[Path.extname(dp[0].path).slice(1)] || 'text/plain';
    const s = fs.createReadStream(dp[0].path);
 
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
   }catch (err){
       res.send(err)
   }
})


module.exports = router;