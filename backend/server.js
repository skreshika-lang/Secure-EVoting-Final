const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// FIX 1: Use absolute path for frontend - this is main deployment fix
app.use(express.static(path.join(__dirname, '../frontend')));

// FIX 2: Support both MONGO_URI and MONGO_URL + Atlas
const MONGO = process.env.MONGO_URI || process.env.MONGO_URL || process.env.MONGODB_URI;
mongoose.connect(MONGO)
  .then(()=>console.log('✅ MongoDB Connected'))
  .catch(e=>console.log('❌ DB Error', e.message));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/vote', require('./routes/vote'));
app.use('/api/face', require('./routes/face'));

app.get('/', (req,res)=> {
  res.sendFile(path.join(__dirname,'../frontend/register.html'));
});

// FIX 3: For deployment, fallback for any frontend route
app.get('/register.html', (req,res)=> res.sendFile(path.join(__dirname,'../frontend/register.html')));
app.get('/login.html', (req,res)=> res.sendFile(path.join(__dirname,'../frontend/login.html')));
app.get('/vote.html', (req,res)=> res.sendFile(path.join(__dirname,'../frontend/vote.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`✅ Running on ${PORT}`));