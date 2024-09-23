import axios from 'axios';

const BASE_URL = 'https://codecompass-six.vercel.app';  // Backend API URL

const adminAxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

adminAxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role === 'admin') {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            throw new Error('Unauthorized');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default adminAxiosInstance;
