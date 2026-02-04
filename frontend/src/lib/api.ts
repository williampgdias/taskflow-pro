import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default api;
