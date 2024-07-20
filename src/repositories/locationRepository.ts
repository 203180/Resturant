import axiosInstance from "../axios/axiosConfig";

export const fetchLocations = async () => {
    const response = await axiosInstance.get('/getLocation')
    return response.data;
}
