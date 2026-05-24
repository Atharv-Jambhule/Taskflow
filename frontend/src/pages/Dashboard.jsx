import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer
} from "recharts";

function Dashboard(){

const navigate=useNavigate();

const [tasks,setTasks]=useState([]);
const [search,setSearch]=useState("");
const [showProfile,setShowProfile]=useState(false);

const [newTask,setNewTask]=useState({

title:"",
description:"",
priority:"Low",
dueDate:""

});


useEffect(()=>{

fetchTasks();

},[]);


const fetchTasks=async()=>{

try{

const token=
localStorage.getItem("token");

const res=
await API.get(

"/tasks",

{
headers:{
Authorization:token
}
}

);

setTasks(res.data);

}

catch(error){

console.log(error);

}

};



const createTask=async()=>{

try{

const token=
localStorage.getItem("token");

await API.post(

"/tasks",

newTask,

{
headers:{
Authorization:token
}
}

);

setNewTask({

title:"",
description:"",
priority:"Low",
dueDate:""

});

fetchTasks();

}

catch(error){

console.log(error);

}

};



const deleteTask=async(id)=>{

const token=
localStorage.getItem("token");

await API.delete(

`/tasks/${id}`,

{
headers:{
Authorization:token
}
}

);

fetchTasks();

};



const updateStatus=async(id,status)=>{

const token=
localStorage.getItem("token");

await API.put(

`/tasks/${id}`,

{status},

{
headers:{
Authorization:token
}
}

);

fetchTasks();

};



const logout=()=>{

localStorage.removeItem(
"token"
);

navigate("/");

};



const filteredTasks=

tasks.filter(

task=>

task.title
.toLowerCase()
.includes(
search.toLowerCase()
)

);


const todo=
filteredTasks.filter(
t=>t.status==="To Do"
);

const progress=
filteredTasks.filter(
t=>t.status==="In Progress"
);

const completed=
filteredTasks.filter(
t=>t.status==="Completed"
);


const chartData=[

{
name:"To Do",
value:todo.length
},

{
name:"Progress",
value:progress.length
},

{
name:"Completed",
value:completed.length
}

];


const COLORS=[

"#3b82f6",
"#f59e0b",
"#10b981"

];



return(

<div style={container}>


<div style={sidebar}>


<h1>

TaskFlow

</h1>


<div style={menu}>

<p>🏠 Dashboard</p>

<p>📋 Tasks</p>

<p>👤 Profile</p>

</div>


<button
style={logoutBtn}
onClick={logout}
>

Logout

</button>

</div>



<div style={content}>


<div style={navbar}>


<h1>

Dashboard 🚀

</h1>


<div
style={{
...profile,
cursor:"pointer"
}}

onClick={()=>setShowProfile(true)}
>

<img
src="https://i.pravatar.cc/50"
style={avatar}
alt=""
/>

<div>

<h4>

Atharv

</h4>

<p>

Developer

</p>

</div>

</div>

</div>



<input
style={searchBar}
placeholder="🔍 Search Tasks"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>



<div style={formCard}>

<h2>

Create Task

</h2>


<input
style={input}
placeholder="Task Title"
value={newTask.title}
onChange={(e)=>

setNewTask({

...newTask,
title:e.target.value

})

}
/>


<input
style={input}
placeholder="Description"
value={newTask.description}
onChange={(e)=>

setNewTask({

...newTask,
description:e.target.value

})

}
/>


<input
style={input}
type="date"
value={newTask.dueDate}
onChange={(e)=>

setNewTask({

...newTask,
dueDate:e.target.value

})

}
/>


<select
style={input}
value={newTask.priority}
onChange={(e)=>

setNewTask({

...newTask,
priority:e.target.value

})

}
>

<option>Low</option>
<option>Medium</option>
<option>High</option>

</select>


<button
style={addBtn}
onClick={createTask}
>

Add Task

</button>

</div>



<div style={chartCard}>

<h3>

Task Analytics

</h3>


<ResponsiveContainer
width="100%"
height={250}
>

<PieChart>

<Pie
data={chartData}
dataKey="value"
outerRadius={80}
>

{
chartData.map(

(entry,index)=>

<Cell
key={index}
fill={COLORS[index]}
/>

)
}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>



<div style={kanban}>


<KanbanColumn
title="To Do"
tasks={todo}
updateStatus={updateStatus}
deleteTask={deleteTask}
/>


<KanbanColumn
title="In Progress"
tasks={progress}
updateStatus={updateStatus}
deleteTask={deleteTask}
/>


<KanbanColumn
title="Completed"
tasks={completed}
updateStatus={updateStatus}
deleteTask={deleteTask}
/>


</div>



{

showProfile && (

<div style={modalOverlay}>

<div style={modal}>

<button
style={closeBtn}
onClick={()=>setShowProfile(false)}
>

✕

</button>

<img
src="https://i.pravatar.cc/100"
style={bigAvatar}
/>

<h2>

Atharv

</h2>

<p>

📧 atharv@example.com

</p>

<p>

💻 MERN Developer

</p>

<p>

📌 Tasks Created:
{tasks.length}

</p>

</div>

</div>

)

}


</div>

</div>

)

}



function KanbanColumn({

title,
tasks,
updateStatus,
deleteTask

}){

return(

<div style={column}>

<h2>{title}</h2>

{

tasks.map(task=>(

<div
key={task._id}
style={taskCard}
>

<h3>{task.title}</h3>

<p>{task.description}</p>

<p>

📅 {

task.dueDate

?

new Date(task.dueDate)
.toLocaleDateString()

:

"No Date"

}

</p>


<select
style={dropdown}
value={task.status}
onChange={(e)=>
updateStatus(
task._id,
e.target.value
)
}
>

<option>To Do</option>
<option>In Progress</option>
<option>Completed</option>

</select>


<button
style={deleteBtn}
onClick={()=>
deleteTask(task._id)
}
>

Delete

</button>

</div>

))

}

</div>

)

}



const container={display:"flex",background:"#0f172a",minHeight:"100vh"};
const sidebar={width:"220px",background:"#111827",padding:"30px",color:"white"};
const menu={marginTop:"40px",lineHeight:"50px"};
const content={flex:1,padding:"30px",color:"white"};
const navbar={display:"flex",justifyContent:"space-between"};
const profile={display:"flex",gap:"15px"};
const avatar={width:"50px",borderRadius:"50%"};
const searchBar={width:"100%",padding:"12px",margin:"20px 0"};
const formCard={background:"#1e293b",padding:"20px",borderRadius:"20px"};
const input={display:"block",width:"100%",padding:"12px",margin:"10px 0"};
const addBtn={padding:"12px",background:"#2563eb",border:"none",color:"white"};
const chartCard={background:"#1e293b",padding:"20px",marginTop:"30px",borderRadius:"20px"};
const kanban={display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px",marginTop:"30px"};
const column={background:"#1e293b",padding:"20px",borderRadius:"20px"};
const taskCard={background:"#334155",padding:"15px",marginTop:"15px",borderRadius:"15px"};
const dropdown={padding:"10px",marginTop:"10px"};
const deleteBtn={marginLeft:"15px",padding:"10px",background:"red",border:"none",color:"white"};
const logoutBtn={marginTop:"40px",padding:"10px",width:"100%"};

const modalOverlay={position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,.6)",display:"flex",justifyContent:"center",alignItems:"center"};
const modal={background:"#1e293b",padding:"30px",width:"350px",borderRadius:"20px",textAlign:"center",position:"relative"};
const closeBtn={position:"absolute",right:"15px",top:"15px",background:"transparent",border:"none",color:"white",fontSize:"22px"};
const bigAvatar={width:"100px",borderRadius:"50%"};

export default Dashboard;