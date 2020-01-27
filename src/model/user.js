const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const schema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:String
        }
    ]
});

schema.methods.GenerateToken=async function(){
    try {
        const user=this;
        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET);
        console.log(token);
        user.tokens.push({token});
        await user.save();
        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error);        
    }
}


schema.statics.loginUser=async (username, password)=>{
    try {
        const user = await  userModel.findOne({username, password})
        if(!user)
            throw 'User not found!';
        return user;
    } catch (err) {
        throw err;
    }
}
const userModel=mongoose.model('User', schema);

module.exports=userModel;