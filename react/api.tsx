import axios from "axios";

const api = axios.create({
    baseURL: 'https://yomcu4f1tc.execute-api.us-east-2.amazonaws.com/default'
});

export default api;