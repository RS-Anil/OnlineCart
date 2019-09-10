const auth = require('../middleware/auth');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');

const express = require('express');
const router = express.Router();

router.get('/login', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne(req.email);
    if(!user) return res.status(400).send('Invalid email or password dsds');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log("Pass",req.body.password);
    console.log("Hash",user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(user);
  } catch (error) {
    console.log(error)
  }


});

router.post('/', async (req, res) => {
  // const { error } = validate(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  try {
    //res.send(_.pick(req.body, ['name', 'email', 'password']))
    const { error } = (req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    console.log(user)
    //const salt = await bcrypt.genSalt(10);
    const salt = await bcrypt.genSalt(10);
    //user.password = await bcrypt.hash(user.password, salt);
    user.password = await bcrypt.hash(user.password, salt)
    const result = await user.save();
    console.log(result)
    res.send(_.pick(user, ['_id', 'name', 'email']));

    //res.send(_.pick(user, ['_id', 'name', 'email']));
  } catch (error) {
    console.log(error)

  }

});

function validate(req){
    const schema ={
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req,schema);
}

module.exports = router; 
