const MongoClient=require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('cant connect to mongodb server');
    }

    console.log('connected to mongodb server');

    /*
    db.collection('Todos').insertOne({
        text:'some text',
        completed:false
    },(err,result)=>{
        if(err){
           return  console.log('unable to connect',err);
        }

        console.log(JSON.stringify(result.ops,undefined,2));
    });
    */

    db.collection('Users').insertOne({
        name:'Abheshek',
        age:22,
        location:'chennai'
    },(err,result)=>{
        if(err){
            return console.log('unable to connect',err);
        }

        console.log(JSON.stringify(result.ops,undefined,2));
    })

    db.close();
});