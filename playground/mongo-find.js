const MongoClient=require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

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

    /*
    db.collection('NewStudents').insert(studentData).then((err,result)=>{
        if(err){
           return  console.log('unable to find',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });

    */

    /*

    db.collection('Todos').find({completed:false}).count().then((count)=>{
        console.log(`Count ${count}`);
    },(err)=>{
        console.log('some error');
    })
    */

    /*
    db.collection('NewStudents').deleteOne({age:34}).then((result)=>{
        console.log(result);
    });

    */

    /*
    db.collection('Users').deleteMany({name:'Abheshek'}).then((result)=>{
        console.log(result);
    });

    */

    /*
    db.collection('Users').deleteOne({"_id": ObjectId("5aa75cbd10a4b7161c14c135")}).then((result)=>{
        console.log(result);
    })
    */

    /*
    db.collection('Todos').findOneAndUpdate({
        _id:new ObjectId('5aa2165d0e8e521238caf21e')
    },{
        $set:{
            completed:true
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })
    */

    db.collection('NewStudents').findOneAndUpdate({
        _id:new ObjectId('5aa768e921871e15a4c68b7c')
    },{
        $set:{
            name:'Kiran'
        },
        $inc:{
            age:56
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    })

    db.close();
});