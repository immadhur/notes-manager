require('dotenv').config();
const express=require('express');
const userModel=require('./src/model/user');
const cors=require('cors');
const app=express();
const port=process.env.PORT||4000;
require('./src/db/mongoose');
const userRouter=require('./src/routers/user');
const notesRouter=require('./src/routers/notes');

app.use(express.json())
app.use(cors());
app.use(userRouter);
app.use(notesRouter);

app.listen(port, ()=>{
    console.log('Server is running on port '+port);
});

module.exports=app;