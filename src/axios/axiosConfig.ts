import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://8f5fabeb-ac2b-4de3-b743-2f238f9846a1.mock.pstmn.io',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;