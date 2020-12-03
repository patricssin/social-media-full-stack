const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// init middleware
// app.use(bodyPasrse.json({ extended: false }))   // used to do
app.use(express.json({ extended: false })); //make req body json, now express includes

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server start on port');
});
