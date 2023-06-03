import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosClient.interceptors.request.use(
    function (config) {
        // Get the access token from localStorage
        const accessToken = localStorage.getItem('psim_access_token');

        // If the access token exists, add it to the Authorization header
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if (res.status == 401) {
            window.location.href = "https://example.com/login";
        }
        console.error("Looks like there was a problem.Status Code: " + res.status);
        return Promise.reject(error);
    }
);

export default axiosClient;