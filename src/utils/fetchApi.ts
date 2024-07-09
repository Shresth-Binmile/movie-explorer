import axios from "axios"
import { useEffect, useState } from "react"
import { MovieData } from "../interfaces/MovieData"
// import { useState } from "react"

export const FetchApi = async() => {
    try {
        const response = await axios.get('https://376689ee81334657b291d79dcf252ffe.api.mockbin.io/')
        const data = await response.data
        return data
        // setMovies(data)
    } catch (error) {
        console.log('Something went wrong!')
    }
}

export const useFetchApi = () => {
    const [movies, setMovies] = useState<MovieData[]>()
    const a = 1;

    useEffect(()=>{
        const data = async() => {
            const m = await FetchApi()
            setMovies(m)
        }
        data()
    }, [a])


    return {movies}
}
// Not using this because giving too many requests