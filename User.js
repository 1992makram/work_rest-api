const mongoose=require('mongoose')

const Schema=mongoose.Schema
const userSchema=new Schema({
    name:{type:String},
    age:{type:Number},
    email:{type:String}
    
})
module.exports=User=mongoose.model('User',userSchema)