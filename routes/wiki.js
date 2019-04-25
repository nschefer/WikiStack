const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page, User } = require('../models');
const wikipage = require('../views/wikipage');
const main = require('../views/main');

module.exports = router;


router.get('/', async (req,res,next)=>{
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req,res,next)=>{
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  const {instance, wasCreated} = await User.findOrCreate({where: {name: req.body.name}})
  console.log(wasCreated);

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    await user.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
  // res.json(req.body);

});

router.get('/add',(req,res,next)=>{
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  // res.send(`hit dynamic route at ${req.params.slug}`);
  try {
    const page = await Page.findOne({
      where: {slug: req.params.slug}
    });
    res.send(wikipage(page));
  } catch (error) { next(error) }
});
