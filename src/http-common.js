import axios from "axios";

export default axios.create({
    // localhost should change later
    // baseURL: "http://localhost:8000/api/",
    // baseURL: "http://gom-backend.azurewebsites.net/api/",
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});
