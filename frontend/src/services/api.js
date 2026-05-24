import axios from "axios";

const API = axios.create({

baseURL:"https://taskflow-backend-1unf.onrender.com/api"

});

export default API;