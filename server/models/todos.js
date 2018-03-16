var mongoose=require('mongoose');

var Todo=mongoose.model('Todo',{
    text:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Number,
        default:null
    }
});

module.exports={
    Todo
}