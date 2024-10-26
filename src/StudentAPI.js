import axios from "axios";

const API_URL = 'http://localhost:8082/api/students';

export const Students = () => {
    return axios.get(API_URL);
}