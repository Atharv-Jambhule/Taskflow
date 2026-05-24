import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Register() {

const navigate = useNavigate();

const [form,setForm]=useState({

name:"",
email:"",
password:""

});


const handleSubmit=async(e)=>{

e.preventDefault();

try{

const res=

await API.post(

"/auth/register",

form

);

localStorage.setItem(

"token",
res.data.token

);

alert(
"Registration Successful"
);

navigate(
"/dashboard"
);

}

catch(error){

console.log(error);

alert(
"Registration Failed"
);

}

};



return(

<div className="auth-container">

<div className="auth-card">

<h1>

Create Account 🚀

</h1>

<form onSubmit={handleSubmit}>


<input
className="auth-input"
type="text"
placeholder="Full Name"
value={form.name}
onChange={(e)=>

setForm({

...form,
name:e.target.value

})

}
/>


<input
className="auth-input"
type="email"
placeholder="Email Address"
value={form.email}
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
value={form.password}
onChange={(e)=>

setForm({

...form,
password:e.target.value

})

}
/>


<button
className="auth-btn"
type="submit"
>

Register

</button>

</form>


<p
style={{

marginTop:"20px",
textAlign:"center"

}}
>

Already have an account?

<Link
to="/"
style={{

marginLeft:"8px",
color:"#60a5fa"

}}
>

Login

</Link>

</p>

</div>

</div>

)

}

export default Register;