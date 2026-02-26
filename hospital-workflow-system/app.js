const express =require('express')
const cookieParser=require('cookie-parser')
const app=express()
const authroutes = require('./src/routes/Auth Routes');
const errorHandler=require('./src/middleware/errorMiddleware')
const patienceroutes=require('./src/routes/Patient Routes')
const requestroutes=require('./src/routes/Request Routes')
const historyroutes=require('./src/routes/historyRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

    

app.use('/api/auth', authroutes);
app.use('/api/patient',patienceroutes);
app.use('/api/patience',patienceroutes);
app.use('/api/request',requestroutes); 
app.use('/api/history',historyroutes);

// for checking


app.get('/api/health', (req, res) =>
  res.status(200).json({ status: 'ok', message: 'Backend is live' })
);
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found', path: req.originalUrl });
});

app.use(errorHandler);

module.exports = app;
