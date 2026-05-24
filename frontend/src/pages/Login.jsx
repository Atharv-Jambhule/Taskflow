import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Login(){

const navigate=useNavigate();

const [form,setForm]=useState({

email:"",
password:""

});

const handleSubmit=async(e)=>{

e.preventDefault();

try{

const res=

await API.post(

"/auth/login",

form

);

localStorage.setItem(

"token",
res.data.token

);

navigate(
"/dashboard"
);

}

catch{

alert(
"Invalid credentials"
);

}

};

return(

<div className="auth-container">

<div className="auth-card">

<h1>

TaskFlow Login

</h1>

<form onSubmit={handleSubmit}>

<input
className="auth-input"
placeholder="Email"
onChange={(e)=>

setForm({

...form,
email:e.target.value

})

}
/>


<input
className="auth-input"
type="password"
placeholder="Password"
onChange={(e)=>

setForm({

...form,
password:e.target.value

})

}
/>


<button
className="auth-btn"
>

Login

</button>

</form>


<p>

New User?

<Link to="/register">

 Register

</Link>

</p>

</div>

</div>

)

}

export default Login;