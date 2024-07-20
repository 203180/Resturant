import axiosInstance from "../axios/axiosConfig";

export const fetchCategories = async () => {
    const response = await axiosInstance.get('/getCategories');
    return response.data;
}