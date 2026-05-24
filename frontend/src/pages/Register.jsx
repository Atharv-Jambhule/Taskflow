import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

const navigate = useNavigate();

const [form, setForm] = useState({
name: "",
email: "",
password: ""
});

const handleSubmit = async (e) => {

e.preventDefault();

try {

const res = await API.post(
"/auth/register",
form
);

console.log("SUCCESS:",res.data);

localStorage.setItem(
"token",
res.data.token
);

navigate("/dashboard");

}

catch(error){

console.log(
"FULL ERROR:",
error
);

console.log(
"RESPONSE:",
error.response?.data
);

alert(

error.response?.data?.msg ||
"Registration Failed"

);

}

};

return(

<div className="auth-container">

<div className="auth-card">

<h1>Register 🚀</h1>

<form onSubmit={handleSubmit}>

<input
placeholder="Name"
value={form.name}
onChange={(e)=>
setForm({
...form,
name:e.target.value
})
}
/>

<input
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

<button type="submit">

Register

</button>

</form>

<p>

Already have account?

<Link to="/">

Login

</Link>

</p>

</div>

</div>

);

}

export default Register;