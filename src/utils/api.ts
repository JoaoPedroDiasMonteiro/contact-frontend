import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true,
    withXSRFToken: true,
})

interface Api extends AxiosInstance {
    csrf: () => Promise<any>
}

const api: Api = axiosInstance as Api

api.csrf = () => axiosInstance.get('/sanctum/csrf-cookie');

export default api
