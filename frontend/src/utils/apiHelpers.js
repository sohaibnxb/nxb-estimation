
import axios from "./axios";

export const getRequest = async ({ url, params = {} }) => {
    try {
        const res = await axios.get(url, { params });
        return res.data;
    } catch (err) {
        return err;
    };
};

//  OR =====> In case of Redux Thunk  <======
//  export const getRequest = async ({ url, params = {}, thunkApi }) => {
//    try {
//      const res = await axios.get(url, { params });
//      return res.data;
//    } catch (err) {
//      return thunkApi.rejectWithValue(err);
//      return err;
//    };
//  };

export const postRequest = async ({ url, data = {}, params = {} }) => {
    try {
        const res = await axios.post(url, data, { params });
        return res.data;
    } catch (err) {
        return err;
    };
};

export const postFormDataRequest = async ({ url, data = {}, params = {} }) => {
    try {
        const res = await axios.post(url, data, {
            params,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        return res.data;
    } catch (err) {
        return err;
    };
};

export const patchRequest = async ({ url, data = {}, params = {} }) => {
    try {
        const res = await axios.patch(url, data, { params });
        return res.data;
    } catch (err) {
        return err;
    };
};

export const patchFormDataRequest = async ({ url, data = {}, params = {} }) => {
    try {
        const res = await axios.patch(url, data, {
            params,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
        return res.data;
    } catch (err) {
        return err;
    };
};

export const putRequest = async ({ url, data = {}, params = {} }) => {
    try {
        const res = await axios.put(url, data, { params });
        return res.data;
    } catch (err) {
        return err;
    };
};

export const deleteRequest = async ({ url, params = {} }) => {
    try {
        const res = await axios.delete(url, { params });
        return res.data;
    } catch (err) {
        return err;
    };
};


// Making GET Requests
import { getRequest } from "./apiHelpers";

const fetchData = async () => {
    try {
        const data = await getRequest({ url: "/api/data" });
        console.log("Fetched data:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

//  OR ====> using with Redux Thunk <======
//  export const contactUsApi = createAsyncThunk("user/fetchData", (params, thunkApi) => {
//    return getRequest({ url: '/api/data', params, thunkApi });
//  });