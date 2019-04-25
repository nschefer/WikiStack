const express = require('express');
const router = express.Router();
const addPage = require ('../views/addPage');

module.exports = router;

router.get('/',(req,res,next)=>{
  // res.send('This is the wiki page');
  // next();
});
router.post('/',(req,res,next)=>{
  res.json(req.body);
});

router.get('/add',(req,res,next)=>{
  res.send(addPage());
});
