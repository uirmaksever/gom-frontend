import axios from "axios";

export default axios.create({
    // localhost should change later
    baseURL: "http://localhost:8002/api/",
    headers: {
        "Content-type": "application/json"
    }
});
