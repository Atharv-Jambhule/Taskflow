import {
PieChart,
Pie,
Cell,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
}
from "recharts";

function Analytics({tasks}){

const statusData=[

{
name:"To Do",
value:
tasks.filter(
t=>t.status==="To Do"
).length
},

{
name:"In Progress",
value:
tasks.filter(
t=>t.status==="In Progress"
).length
},

{
name:"Completed",
value:
tasks.filter(
t=>t.status==="Completed"
).length
}

];


const priorityData=[

{
name:"Low",
count:
tasks.filter(
t=>t.priority==="Low"
).length
},

{
name:"Medium",
count:
tasks.filter(
t=>t.priority==="Medium"
).length
},

{
name:"High",
count:
tasks.filter(
t=>t.priority==="High"
).length
}

];


const COLORS=[
"#3B82F6",
"#F59E0B",
"#10B981"
];


return(

<div style={container}>


<div style={card}>

<h3>

Task Status Analytics

</h3>


<ResponsiveContainer
width="100%"
height={250}
>

<PieChart>

<Pie
data={statusData}
dataKey="value"
outerRadius={80}
>

{

statusData.map(

(entry,index)=>(

<Cell
key={index}
fill={COLORS[index]}
/>

)

)

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>



<div style={card}>

<h3>

Priority Analytics

</h3>


<ResponsiveContainer
width="100%"
height={250}
>

<BarChart
data={priorityData}
>

<XAxis
dataKey="name"
/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="count"
fill="#3B82F6"
/>

</BarChart>

</ResponsiveContainer>

</div>


</div>

)

}


const container={

display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginTop:"30px"

};


const card={

background:"#1e293b",
padding:"20px",
borderRadius:"20px",
color:"white"

};


export default Analytics;