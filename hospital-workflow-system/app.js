const express =require('express')
const cookieParser=require('cookie-parser')
const app=express()
const authroutes = require('./src/routes/Auth Routes');
const errorHandler=require('./src/middleware/errorMiddleware')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

    

app.use('/api/auth', authroutes);

// app.use('/api/patience', authroutes);
// app.use('/api/request', authroutes);


app.use(errorHandler);




// for checking

app.get('/api/health', (req, res) =>
  res.status(200).json({ status: 'ok', message: 'Backend is live' })
);
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found', path: req.originalUrl });
});

module.exports = app;

