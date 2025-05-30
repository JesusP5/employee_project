// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');
const db = require('./config/db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

db.sync().then(() => {
  console.log('MySQL connected and synced');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MySQL connection error:', err));