import axios from "axios";

const api = axios.create({
    baseURL: ' https://7u5842zxed.execute-api.us-east-2.amazonaws.com/dev',
});

export default api;