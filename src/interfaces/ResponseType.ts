
export interface loginResponse{
    name?: string,
    favorites?: string[]
}

export interface CommentsResponse {
    comments?: string
    imdbID?: string
    ratings?: string
    userID?: string
    __v?: number
    _id?: string
}

export interface FavoritesResponse {
    imdbID?: string
    userID?: string
    __v?: number
    _id?: string
}
