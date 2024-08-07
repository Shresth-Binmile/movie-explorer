import { ratings } from "./StateInterfaces"

export interface comments {
    movieName: string,
    comment: string,
    rating?: number
}

export interface Userdata {
    // id: number,
    user: {
        name: string,
        password: string,
        phoneNo: string,
    },
    ratings: ratings[],
    favorites: number[],
    comments: comments[]
}