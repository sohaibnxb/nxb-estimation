// axios.js
import Axios from "axios";
import { toast } from 'react-toastify';

// Dynamic import
// const getStore = async () => {
//     const { store } = await import('<path-to-redux-store>/store.js');
//     return store;
// };

const API = Axios.create({});

const serverUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export const baseURL = `${serverUrl}`;
let isNavigatingToSignIn = false;

export const getIsNavigatingToSignIn = () => isNavigatingToSignIn;

export const setIsNavigatingToSignIn = (value) => {
    isNavigatingToSignIn = value;
};


// API.defaults.timeout = 120000; // Milliseconds

export const history = {
    navigate: null,
    location: null
};

API.interceptors.request.use(
    async function (config) {
        // Retreive token from Redux OR localStorage or ....
        // const store = await getStore();
        // const token = store?.getState()?.user?.token;
        const token = localStorage.getItem('access-token') ? JSON.parse(localStorage.getItem('access-token')) : null

        if (token) {
            config.headers["x-access-token"] = token;
        }

        config.headers["Content-Type"] = "application/json";
        config.baseURL = baseURL;

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (error?.response?.status === 403) {
            // Handle forbidden error

        }
        else if (error?.response?.status === 401) {
            if (!isNavigatingToSignIn) {
                isNavigatingToSignIn = true
                toast.error('Your session has expired. Please log in again.', {
                    autoClose: 3000,
                });
            }
            history.navigate('/signin');
            localStorage.clear()
        }
        else {
            throw error; // Propagate the error
        }
    }
);


export default API;











// export const apiInstance = axios.create({
//     baseURL,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     }
// });

// export const formDataInstance = axios.create({
//     baseURL,
//     headers: {
//         'Content-Type': 'multipart/form-data',
//         'Accept': 'application/json',
//     }
// })

// const API = async (config) => {

//     const {
//         instance = apiInstance,
//         method,
//         url,
//         requestConfig,
//         requireAuth = false,
//         isFormData = false,
//     } = config

//     const abortController = new AbortController()
//     const signal = abortController.signal

//     instance.interceptors.request.use(async (config) => {
//         if (requireAuth) {
//             const token = await getInternetCredentials(baseURL)
//             if (token.password) {
//                 config.headers.Authorization = `Bearer ${token.password}`
//             }
//         }
//         if (isFormData) {
//             config.headers['Content-Type'] = 'multipart/form-data';
//         }

//         return config
//     })

//     try {
//         const res = await instance[method.toLowerCase()](url, requestConfig, { signal })
//         if (res.status === 200) {
//             return { data: res.data, abortController }
//         }
//     } catch (e) {
//         throw new Error(e)
//     }
// }

// export default API
