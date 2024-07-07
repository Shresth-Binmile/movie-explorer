import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function useAuth () {
    const [isLogin, setIsLogin] = useState(false)
    const userState = useSelector((state: RootState)=>state.userReducer.name)

    useEffect(()=>{
        const Authorize = () => {
            if(userState){
                setIsLogin(true)
            }
        }
        Authorize()
    },[userState])

    return {isLogin, setIsLogin, userState}
}