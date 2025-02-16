const express = require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const taskRouter=require('./routes/taskRoute')
const errorMiddleware=require('./middleware/taskErrorMiddleware')

const MONGO_URI = "mongodb+srv://tusharnetsavvies:hsQ6PnweU6LKnldf@cluster0.jduj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/";

app.use(cors())
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("All Good")
})
const connect = async () => {
    await mongoose
      .connect(
        MONGO_URI, )
      .then(() => { 
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB", error);
      });
  };
  connect();
app.listen(7000)
app.use('/tasks',taskRouter)
app.use(errorMiddleware);
// tusharnetsavvies
// WWr3M7Kh3XhoPR3x

// tusharnetsavvies
// hsQ6PnweU6LKnldf