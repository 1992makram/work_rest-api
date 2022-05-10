const express=require('express')
const app=express()
const User=require('./models/User')
const bodyParser=require('body-parser')

app.use(bodyParser.json())



app.get('/returnusers',async(req,res)=>{
    try{
        await User.find({}).then((result)=>{
            res.send(result);
        });
    } catch(err){
        console.log(err);
    }
}); 

 app.post('/add',async(req,res)=>{
    try{
        let new_user=new User({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
        });
        await new_user.save();
        res.send('save affected ');
    }catch(err){
        console.log(err);
    }
}); 

app.put('/edit_user/:id',async(req,res)=>{
    try{
        await User.findOneAndUpdate({
            _id:req.params.id},
            {email:req.body.email,
        });
        res.send('user edited');
    }catch(err){
        res.send(err);
    }
}); 

 app.delete('/Delete/:id',(res,req)=>{
     const {id}=req.params
     User.findOneAndDelete({id})
        .then(user=>res.send(user))
        .catch(err=>console.log(err))
 })


const mongoose =require('mongoose')
require('dotenv').config({ path:'./config/.env'});

mongoose.connect(process.env.MONGO_URI)
       .then(()=>console.log('mongodb connected'))
.catch((error)=>{
    console.log(error);
});


app.listen(9000,()=>console.log('server is  running'))