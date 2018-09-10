const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(cors());
// Connect to MongoDB
mongoose
  .connect(
    'mongodb://localhost:27017/homeincome',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
const users = require('./routes/users');

app.use('/user', users);

const port = 3000;

app.listen(port, () => console.log('Server running: ' + port));
