
export interface ratings {
    Source: string,
    Value: string
}

export interface MovieData {
    // movie: {
        Title: string,
        Year: string,
        Rated: string,
        Released: string,
        Runtime: string,
        Genre: string,
        Director: string,
        Writer: string,
        Actors: string,
        Plot: string,
        Language: string,
        Country: string,
        Awards: string,
        Poster: string,
        Ratings: ratings[]
        Metascore: string,
        imdbRating: string,
        imdbVotes: string,
        imdbID: string,
        Type: string,
        DVD: string,
        BoxOffice: string,
        Production: string,
        Website: string,
        Response: string
    // }
}

export interface MovieDetails {
    movie: {
        Title: string,
        Year: string,
        Rated: string,
        Released: string,
        Runtime: string,
        Genre: string,
        Director: string,
        Writer: string,
        Actors: string,
        Plot: string,
        Language: string,
        Country: string,
        Awards: string,
        Poster: string,
        Ratings: ratings[]
        Metascore: string,
        imdbRating: string,
        imdbVotes: string,
        imdbID: string,
        Type: string,
        DVD: string,
        BoxOffice: string,
        Production: string,
        Website: string,
        Response: string
    }
}