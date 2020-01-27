const mongoose=require('mongoose');
const url=process.env.MONGO_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Database connected!');
}).catch((err)=>{
    console.log('Error in connecting db!');
});

module.exports=mongoose;