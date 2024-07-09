import { initialStateInterface } from "../interfaces/StateInterfaces"
import { Userdata } from "../interfaces/Userdata"

export const getCurrentUser = () => {
    const currentUser:Userdata[] = JSON.parse(localStorage.getItem('currentUser')!)

    return currentUser? currentUser : []
}

export const updateUser = (data:initialStateInterface) => {
    // console.log(Array.from(data.comments), Array.from(data.favorites), Array.from(data.ratings))
    const currentUserData:Userdata[] = getCurrentUser()
    // console.log('before', currentUserData[0])
    
    const newCurrentUserData:Userdata = {
        user: currentUserData[0].user,
        favorites: Array.from(data.favorites),
        comments: Array.from(data.comments),
        ratings: Array.from(data.ratings)
    }
    // console.log('newCurrentUser', newCurrentUserData)
    const lsData:Userdata[] = JSON.parse(localStorage.getItem('users')!) // getting userlist from db
    let userId = -1;
    for(let i = 0; i < lsData.length; i++){ // finding current user syntax
        if(newCurrentUserData.user.name === lsData[i].user.name && newCurrentUserData.user.password === lsData[i].user.password){
            userId = i
            break
        }
    }

    // console.log('id: ', userId)
    let user: Userdata[];
    user = []
    for(let i = 0; i < lsData.length; i++){
        if(userId === i){
            user.push(newCurrentUserData)
        }
        else{
            user.push(lsData[i])
        }
    }
    // console.log(user)

    localStorage.setItem('users', JSON.stringify(user))
    localStorage.setItem('currentUser', JSON.stringify([newCurrentUserData]))
    // console.log('before', currentUserData[0])

}