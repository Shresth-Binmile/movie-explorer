import { comments } from '../interfaces/Userdata'


export interface ratings{
    movieName: string,
    value: number
}

export interface initialStateInterface {
    name: string,
    ratings: ratings[]
    comments: comments[],
    favorites: number[]
}