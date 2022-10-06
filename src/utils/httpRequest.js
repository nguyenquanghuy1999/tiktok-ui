import axios from "axios";

export const requestApiFake = axios.create({
    baseURL: process.env.REACT_APP_BASE_FAKE_URL,
})

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const get = async (path, option = {}) => {
    const response = await request.get(path, option);
    return response.data;
}

export default request;