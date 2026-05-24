const Task=require("../models/Task");


// Create Task

exports.createTask=async(req,res)=>{

try{

const task=new Task({

title:req.body.title,

description:req.body.description,

priority:req.body.priority,

dueDate:req.body.dueDate,

user:req.user

});

await task.save();

res.status(201).json(task);

}

catch(error){

res.status(500).json(error);

}

};


// Get Tasks

exports.getTasks=async(req,res)=>{

try{

const tasks=

await Task.find({

user:req.user

});

res.json(tasks);

}

catch(error){

res.status(500).json(error);

}

};


// Delete Task

exports.deleteTask=async(req,res)=>{

try{

await Task.findByIdAndDelete(

req.params.id

);

res.json({

msg:"Deleted"

});

}

catch(error){

res.status(500).json(error);

}

};


// Update Status

exports.updateStatus=async(req,res)=>{

try{

const updated=

await Task.findByIdAndUpdate(

req.params.id,

{

status:req.body.status

},

{

new:true

}

);

res.json(updated);

}

catch(error){

res.status(500).json(error);

}

};