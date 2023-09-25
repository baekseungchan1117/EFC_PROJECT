import axios from 'axios';

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const accessToken = await getNewToken();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            return axios(originalRequest);
        }

        return Promise.reject(error);
    }
);

async function getNewToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await axios.post('/auth/refreshToken', { token: refreshToken });
        if (response.data && response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            return response.data.accessToken;
        } else {
            window.location.href = '/login';
        }
    } catch (error) {
        window.location.href = '/login';
    }
}

export default axios;
