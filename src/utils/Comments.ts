import { comments } from "../interfaces/Userdata"

export const addMovieComments = (data:comments) =>{
    const comArr:comments[] = getMovieComments()

    if(comArr){
        localStorage.setItem('movie-comments', JSON.stringify([...comArr, data]))
    }
    else{
        localStorage.setItem('movie-comments', JSON.stringify([data]))
    }
}

export const getMovieComments = () => {
    const comArr:comments[] = JSON.parse(localStorage.getItem('movie-comments')!)

    // console.log(comArr)

    return comArr
}