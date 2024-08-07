import axios from "axios";
import { LoginFormData } from "../interfaces/LoginFormData";
import toast from "react-hot-toast";

export const CheckUserInDB = async(data:LoginFormData) => {
    try {
        const response = await axios.post('https://movie-app-backend-mongodb.onrender.com/api/v1/login', data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log(response)
        return {
            message: response.data.message,
            token: response.data.data.token
        }
    } catch (error:any) {
        console.log('error: ', error)
        toast.error(error)
    }
}