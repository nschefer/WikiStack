const express = require('express');
const morgan = require('morgan');
const layout = require('./views/layout');
const models = require ('./models/index');
const { db,Page,User } = require('./models');
const main = require('./views/main');

const userRouter = require('./routes/user');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const wikiRouter = require('./routes/wiki');

const app=express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res,next)=>{
  res.redirect('/wiki');
})

app.use('/user',userRouter);
app.use('/wiki',wikiRouter);

app.get('/', async (req,res,next)=>{
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
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
