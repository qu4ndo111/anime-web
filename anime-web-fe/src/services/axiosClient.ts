import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:4000',
})

axiosClient.interceptors.request.use(
    (config) => {
        const clientId = import.meta.env.VITE_MAL_CLIENT_ID;
        if(clientId) {
            config.headers['X-MAL-CLIENT-ID'] = clientId;
        }
        return config
    },
    (err) => Promise.reject(err)
);

export default axiosClient;