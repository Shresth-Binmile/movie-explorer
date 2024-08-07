import { comments } from '../interfaces/Userdata'


export interface ratings{
    movieName: string,
    value: number
}

export interface initialStateInterface {
    name: string,
    comments: comments[],
    favorites: string[]
}