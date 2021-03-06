const expect=require('expect');
const request=require('supertest');
const {ObjectID} =require('mongodb');

const {app}=require('./../server');
const {Todo}=require('./../models/todos');

const todos=[{
    _id:new ObjectID(),
    text:"first todo"
},
{
    _id:new ObjectID(),
    text:"second todo",
    completed:false,
    completedAt:333
}]


beforeEach((done)=>{
     Todo.remove({}).then(()=>{
         Todo.insertMany(todos)
     }).then(()=>done());
});

describe('POST /todos',()=>{
    
    it('should create a new todo',(done)=>{
        var text='some new text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
             return done(err);
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });
    

        it('should not create body with invalid data',(done)=>{

            request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e)=>done(e));
            });
        });
        
        describe('GET /todos',()=>{
            it('should get all todos',(done)=>{
                request(app)
                .get('/todos')
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todos.length).toBe(2)
                })
                .end(done);
            });
        });

        describe('GET /todos/:id',()=>{
            it('should return todo doc',(done)=>{
                request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe(todos[0].text);
                })
                .end(done);
            });

            it('should return a 404 if todo not found',(done)=>{
                var obj = new ObjectID();
                request(app)
                .get(`/todos/${obj.toHexString()}`)
                .expect(404)
                .end(done);
            });

            it('should return  404 for inValid objectIds',(done)=>{
                request(app)
                .get('/todos/123')
                .expect(404)
                .end(done);
            });
        });

        describe('DELETE /todos/:id',()=>{
            it('should remove a doc',(done)=>{
                var id=todos[1]._id.toHexString();
                request(app)
                .delete(`/todos/${id}`)
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo._id).toBe(id);
                }).end((err,res)=>{
                    if(err){
                        return done(err);
                    }

                    Todo.findById(id).then((todo)=>{
                        expect(todo).toNotExist();
                        done();
                    }).catch((e)=>done(e));

                });
                
            });


            
            it('should return 404 i todo not found',(done)=>{
                var obj = new ObjectID();
                request(app)
                .get(`/todos/${obj.toHexString()}`)
                .expect(404)
                .end(done);
            });

            it('should return 404 if id not found',(done)=>{
                request(app)
                .get('/todos/123')
                .expect(404)
                .end(done);
            });
            
        })

        describe('PATCH /todos/:id',()=>{
            it('should update a todo',(done)=>{
                var obj=todos[0]._id.toHexString();
                request(app)
                .patch(`/todos/${obj}`)
                .send({text:"deergtb",completed:true})
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe('deergtb');
                    expect(res.body.todo.completed).toBe(true);
                    expect(res.body.todo.completedAt).toBeA('number');
                    
                })
                .end(done);
            })

            it('should clear completedAt when todo is not completed',()=>{
                var obj=todos[1]._id.toHexString();
                request(app)
                .patch(`/todos/${obj}`)
                .send({text:'dfvgbb',completed:false})
                .expect(200)
                .expect((res)=>{
                    expect(res.body.todo.text).toBe(todos[1].text);
                    expect(res.body.todo.completed).toBe(false);
                    expect(res.body.todo.completedAt).toNotExist();
                })
                
            })  


        });
       
    
});