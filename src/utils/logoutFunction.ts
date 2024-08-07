export function logout (){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
}