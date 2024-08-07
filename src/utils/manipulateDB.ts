import axios from "axios"
import { RegisterFormData } from "../interfaces/RegisterFormData"
import toast from "react-hot-toast"

const base_url = 'https://movie-app-backend-mongodb.onrender.com/api/v1'

export const AddUserToDB = async(data:RegisterFormData) => {
    try {
        const newUser = {
            name: data.name,
            password: data.password,
            phoneNo: data.phoneNumber   
        }
        const response = await axios.post(`${base_url}/register`, newUser, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        })
        if(response?.data?.message) toast.success(response?.data?.message)
    } catch (error:any) {
        // console.log('error: ', error)
        if(error?.response?.data?.error?.message) toast.error(error?.response?.data?.error?.message)
    }
}

export const getFavorites = async() => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${base_url}/getFavorites`, {
            headers: {
                'Authorization': `$Bearer ${token}`
            }
        })
        return response?.data?.data?.favorites
    } catch (error:any) {
        // console.log('error: ', error)
        if(error?.response?.data?.error?.message) toast.error(error?.response?.data?.error?.message)
    }
}

export const addFavorites = async(imdbID:string) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${base_url}/addFavorites?imdbID=${imdbID}`,{
            headers: {
                'Authorization': `$Bearer ${token}`
            }
        })
        if(response?.data?.message) toast.success(response?.data?.message)
    } catch (error:any) {
        // console.log('error: ', error)
        if(error?.response?.data?.error?.message) toast.error(error?.response?.data?.error?.message)
    }
}

export const removeFavorites = async(imdbID:string) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${base_url}/removeFavorites?imdbID=${imdbID}`,{
            headers: {
                'Authorization': `$Bearer ${token}`
            }
        })
        if(response?.data?.message) toast.success(response?.data?.message)
    } catch (error:any) {
        // console.log('error', error)
        if(error?.response?.data?.error?.message) toast.error(error?.response?.data?.error?.message)
    }
}

export const getCommentsAndRatings = async(imdbID:string) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${base_url}/getCommmentsAndRatings?imdbID=${imdbID}`,{
            headers: {
                'Authorization': `$Bearer ${token}`
            }
        })
        return response?.data?.data
    } catch (error:any) {
        // console.log('error: ', error)
        if(error?.response?.data?.error?.message) toast.error(error?.response?.data?.error?.message)
    }
}

export const addCommentsAndRatings = async(imdbID:string, comments: string, ratings: number) => {
    try {
        const token = localStorage.getItem('token')
        const data = {
            comments,
            ratings
        }
        const response = await axios.post(`${base_url}/addCommmentsAndRatings?imdbID=${imdbID}`, data, {
            headers: {
                'Authorization': `$Bearer ${token}`
            }
        })
        if(response?.data?.message) toast.success(response?.data?.message)
    } catch (error:any) {
        // console.log('error: ', error)
        if(error?.response?.data?.error?.message) toast.error(error?.response?.data?.error?.message)
    }
}