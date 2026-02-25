const express =require('express')
const cors = require('cors');
const app=express()
const authroutes = require('./src/routes/Auth Routes');

app.use(express.json());

// app.use(cookieParser());

    

app.use('/api/auth', authroutes);

// app.use('/api/patience', authroutes);
// app.use('/api/request', authroutes);






// for checking

app.get('/api/health', (req, res) =>
  res.status(200).json({ status: 'ok', message: 'Backend is live' })
);
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found', path: req.originalUrl });
});

module.exports = app;

