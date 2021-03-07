const express = require('express');
const app = express();
const dotenv = require('dotenv');
// import routes
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');

dotenv.config();

// db connection
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('\nConnected to DB'));

// Json middleware
app.use(express.json());

// Route middleware
app.use('/api/user', authRoute);

app.use('/api/posts', postRoute);


app.listen(5000, () => console.log('Server running'));
