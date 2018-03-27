var mongoose=require('mongoose');

var Todo=mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
    },
    createdAt:{
        type:Number,
    }
});

module.exports={
    Todo
}