import { LoginFormData } from "../interfaces/LoginFormData";
import { Userdata } from "../interfaces/Userdata";

export const CheckUserInDB = (data:LoginFormData) => {

    const lsData:Userdata[] = JSON.parse(localStorage.getItem('users')!)

    const isUserExist = lsData.filter((user, _index)=>{
        return user.user.name === data.name && user.user.password === data.password
    })

    // console.log(isUserExist)

    return isUserExist
}