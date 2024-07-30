//controllers/UserController.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'Prestige_POS';

function checkAdmin(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decoded = jwt.verify(token, JWT_SECRET); 

    if (!decoded.role || decoded.role !== 'admin') {
      return res.status(403).send('Unauthorized');
    }
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send('Unauthorized');
  }
}

//Authenticating user
router.post('/authenticate', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;

  try {
    const user = await User.getByUsername(username);
    if (!user) return res.status(400).send('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user.user_id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ user_id: user.user_id, username: user.username, firstname: user.firstname, lastname: user.lastname, role: user.role, token });
  } catch (error) {
    console.error('Error authenticating user:', error.message, error.stack);
    res.status(500).send('Error authenticating user');
  }
});


// Get all the username from the database
router.get('/usernames', async (req, res) => {
  try {
    const usernames = await User.getAllUsernames();
    res.json(usernames);
  } catch (error) {
    console.error('Error fetching usernames:', error);
    res.status(500).send('Error fetching usernames');
  }
});

//Get all the user detail from the database
router.get('/users', authenticateToken, checkAdmin, async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Get user by Id 
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).send('Invalid user ID');
  }

  try {
    const user = await User.getById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({ firstname: user.firstname, lastname: user.lastname, role: user.role });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).send('Error fetching user');
  }
});

//Create a new User and store the information in to the database
router.post('/register', async (req, res) => {
  const schema = Joi.object({
    user_id: Joi.string().min(3).required(),
    username: Joi.string().min(4).required(),
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    phone: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { user_id, username, firstname, lastname, email, password, role, address, phone } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ user_id, username, firstname, lastname, email, password: hashedPassword, role, address, phone });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).send('Error creating user: ' + error.message);
  }
});



module.exports = router;
