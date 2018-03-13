const MongoClient=require('mongodb').MongoClient;

var studentData=[
    {
        name:'Abheshek',
        age:34
    },
    {
        name:'dddvfbg',
        age:45
    },
    {
        name:'fvgbbnnn',
        age:56
    }
]

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

    db.collection('NewStudents').insert(studentData).then((err,result)=>{
        if(err){
           return  console.log('unable to find',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    /*

    db.collection('Todos').find({completed:false}).count().then((count)=>{
        console.log(`Count ${count}`);
    },(err)=>{
        console.log('some error');
    })
    */

    db.close();
});