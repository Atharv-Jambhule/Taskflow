const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

require("dotenv").config();

const app=express();

app.use(express.json());

app.use(

cors({

origin:true,

credentials:true,

methods:[

"GET",
"POST",
"PUT",
"DELETE"

],

allowedHeaders:[

"Content-Type",
"Authorization"

]

})

);

mongoose.connect(

process.env.MONGO_URI

)

.then(()=>{

console.log(
"MongoDB Connected"
);

})

.catch((err)=>{

console.log(err);

});


app.get("/",(req,res)=>{

res.send(
"TaskFlow API Running"
);

});


app.use(

"/api/auth",

require("./routes/authRoutes")

);


app.use(

"/api/tasks",

require("./routes/taskRoutes")

);


const PORT=

process.env.PORT || 5000;


app.listen(PORT,()=>{

console.log(

`Server running on ${PORT}`

);

});