const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const models = require ('./models/index');
const { db,Page,User } = require('./models');

const userRouter = require('./routes/user');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const wikiRouter = require('./routes/wiki');

const app=express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use('/user',userRouter);
app.use('/wiki',wikiRouter);

app.get('/wiki',(req,res,next)=>{
  console.log('test');
  res.redirect('/');
})



app.get('/',(req,res,next)=>{
  res.send(layout(''));
})

const PORT = 3000;

const init = async()=>{
  // await models.User.sync();
  // await models.Page.sync();
  await models.db.sync({force:true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}


init();
