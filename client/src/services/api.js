import { extend } from 'umi-request';

const backendURL = 'http://localhost:3000/api';

const Api = extend({
    prefix: backendURL,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    },
    params: {
        t: Date.now(),
    },
    errorHandler: (error) => {
        console.log(error);
    }
});

export default Api;
