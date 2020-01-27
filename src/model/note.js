const mongoose=require('mongoose');

const schema=mongoose.Schema({
    data:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports=mongoose.model('Notes', schema);