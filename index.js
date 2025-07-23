require('dotenv').config(); // Load .env first

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const offerRoutes = require('./routes/offerRoutes');

const app = express();
app.use(bodyParser.json());

// Use MONGODB_URI from .env
mongoose.connect(process.env.MONGODB_URI, {
  
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('DB Connection Error:', err));

app.use('/api', offerRoutes);

// Use PORT from .env or fallback
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
