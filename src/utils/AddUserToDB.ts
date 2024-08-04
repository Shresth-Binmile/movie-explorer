import axios from "axios"
import { RegisterFormData } from "../interfaces/RegisterFormData"

export const AddUserToDB = async(data:RegisterFormData) => {
    try {
        const newUser = {
            name: data.name,
            password: data.password,
            phoneNo: data.phoneNumber   
        }
        console.log(newUser)
        const user = await axios.post('http://localhost:3000/api/v1/register', newUser, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials:true
        })    
        console.log(user)
    } catch (error) {
        console.log(error)
    }
    // const existUser = JSON.parse(localStorage.getItem('users')!)

    // if(existUser) localStorage.setItem('users', JSON.stringify([...existUser,newUser]))
    // else  localStorage.setItem('users', JSON.stringify([newUser]))

    // const user = JSON.parse(localStorage.getItem('users')!)
    // console.log(user)
}