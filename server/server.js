var express=require('express');
var bodyParser=require('body-parser');


var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todos');
var {User}=require('./models/users');

var {ObjectID}=require('mongodb');



var app=express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
   var todo =new Todo({
       text:req.body.text
   })

   todo.save().then((doc)=>{
    res.send(doc);
   },(e)=>{
    res.status(400).send(e);
   })
});

app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;

    if(!ObjectID.isValid(id)){
      return  res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
           return  res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    })
   
})

app.listen(3000,()=>{
    console.log('starting app on port 3000');
});

module.exports={
    app
}


/*







var secondTodo =new Todo({
    text:'second text',
    completed:false,
    createdAt:345
})


secondTodo.save().then((doc)=>{
    console.log('saved doc',doc);
},(e)=>{
    console.log(e);
})

*/

/*
var newUser=new User({
    email:"cabheshek@gmail.com     "
});

newUser.save().then((doc)=>{
    console.log('saved doc',doc);  
},(e)=>{
    console.log(e);
});
*/