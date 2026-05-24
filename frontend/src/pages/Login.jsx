import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login(){

const navigate=useNavigate();

const [form,setForm]=useState({

email:"",
password:""

});


const handleSubmit=async(e)=>{

e.preventDefault();

try{

const res=await API.post(

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

catch(error){

console.log(error);

alert(
"Invalid credentials"
);

}

};


return(

<div className="auth-container">

<div className="auth-card">

<h1>

Login 🚀

</h1>


<form onSubmit={handleSubmit}>


<input

className="auth-input"

type="email"

placeholder="Email"

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

Login

</button>


</form>


<p>

No account?

<Link
to="/register"
>

Register

</Link>

</p>


</div>

</div>

)

}

export default Login;