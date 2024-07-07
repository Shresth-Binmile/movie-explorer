
export interface comments {
    movieName: string,
    comment: string
}

export interface Userdata {
    // id: number,
    user: {
        name: string,
        password: string,
        phoneNo: string,
    },
    ratings: [],
    favorites: number[],
    comments: comments[]
}