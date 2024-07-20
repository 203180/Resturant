import axiosInstance from "../axios/axiosConfig";

export const fetchProducts = async () => {
    const response = await axiosInstance.get('/getProducts');
    return response.data;
}