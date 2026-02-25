const app=require('./app')
require("dotenv").config();
const connectDb=require('./src/config/db')

const port =process.env.PORT

connectDb();

app.listen(port,()=>{
  
    console.log(`Sever started at ${port}`);
    
})

