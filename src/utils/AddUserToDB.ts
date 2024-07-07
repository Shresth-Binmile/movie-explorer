import { RegisterFormData } from "../interfaces/RegisterFormData"

export const AddUserToDB = (data:RegisterFormData) => {

    const newUser = {
        user: data,
        ratings: [],
        favorites: [],
        comments: []        
    }

    const existUser = JSON.parse(localStorage.getItem('users')!)

    if(existUser) localStorage.setItem('users', JSON.stringify([...existUser,newUser]))
    else  localStorage.setItem('users', JSON.stringify([newUser]))

    // const user = JSON.parse(localStorage.getItem('users')!)
    // console.log(user)
}