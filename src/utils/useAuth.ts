import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
// import { Userdata } from "../interfaces/Userdata";
import { loginResponse } from "../interfaces/ResponseType";
import { getCurrentUserFromLS } from "./saveDataInDB";
import { setInitialState } from "../redux/userSlice";

export function useAuth () {
    const [isLogin, setIsLogin] = useState(false)
    const userState = useSelector((state: RootState)=>state.userReducer)
    const [user, setUser] = useState<loginResponse>()
    const dispatch = useDispatch()
    // console.log('Auth is running...')
    useEffect(()=>{
        const Authorize = async() => {
            const currentUser = await getCurrentUserFromLS()
            dispatch(setInitialState(currentUser!))
            if(currentUser){
                setUser(currentUser)
                // console.log('user from auth', user)
                setIsLogin(true)
                // console.log('isLogin from auth', isLogin)
            }
        }
        Authorize()
    },[isLogin])

    return {isLogin, setIsLogin, userState, user, setUser}
}