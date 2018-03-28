const {mongoose} =require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todos');
const {User}=require('./../server/models/users');

var id='5aabcab884f4275008806a29';

/*
if(!ObjectID.isValid(id)){
    console.log('Invalid id');
}
*/

/*
Todo.find({
    _id:id
}).then((todo)=>{
    console.log('Todos',todo);
});


Todo.findOne({
    _id:id
}).then((todo)=>{
    console.log('Todo',todo);
});

*/


User.findById(id).then((user)=>{
    if(!user){
        console.log('user not found');
    }
    console.log('Found user',user);
},(e)=>{
    console.log(e);
})


