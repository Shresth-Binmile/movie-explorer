import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getCurrentUser } from "./saveDataInDB";
import { Userdata } from "../interfaces/Userdata";

export function useAuth () {
    const [isLogin, setIsLogin] = useState(false)
    const userState = useSelector((state: RootState)=>state.userReducer.name)
    const [user, setUser] = useState(<Userdata[]>[])

    useEffect(()=>{
        const Authorize = () => {
            setUser(getCurrentUser())
            if(user && user.length != 0){
                setIsLogin(true)
            }
        }
        Authorize()
    },[user])

    return {isLogin, setIsLogin, userState, user, setUser}
}