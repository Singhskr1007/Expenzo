import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) =>{
    const formData = new FormData();
    formData.append('image', imageFile);   // append image file to form data
    try 
    {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData ,{
            headers: {
                'Content-Type': 'multipart/form-data',  // SET HEADER FOR FILE UPLOAD
            },
        });
        return response.data;  // return response data
    } 

    catch(error) 
    {
        console.error("Error Uploading The Image : ", error);
        throw error;   // re-throw error for handling
    }
};

export default uploadImage;