const express = require('express');
const donators = require('./Donators');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Donators API Routes
app.use('/api/donators', require('./routes/api/donators'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));