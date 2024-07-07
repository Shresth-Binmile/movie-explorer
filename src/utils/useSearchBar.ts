import { useEffect, useState } from "react"
import movies from '../data/movies.json'
import { MovieData } from "../interfaces/MovieData"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export function useSearchBar() {

    const [searchText, setSearchText] = useState('')
    const [results, setResults] = useState<MovieData[]>([])
    const userState = useSelector((state: RootState) => state.userReducer.favorites)
    const [indexes, setIndexes] = useState<number[]>([])
    const location = useLocation().pathname

    useEffect(()=>{
        if(location == '/'){   // for Movie Listing Page
            const SearchMovies = () => {
                const result = movies.filter((movie)=>{
                    return movie.Title.toLowerCase().includes(searchText) || movie.Plot.toLowerCase().includes(searchText)
                })
    
                console.log(result)
                setResults(result)
            }
            SearchMovies()
        }
        else{   // for Favorites Page
            const SearchMovies = () => {
                const result = userState.filter((movie)=>{
                    return movies[movie].Title.toLowerCase().includes(searchText) || movies[movie].Plot.toLowerCase().includes(searchText)
                })
    
                console.log(result)
                setIndexes(result)
            }
            SearchMovies()
        }
    },[searchText])

  return {searchText, setSearchText, results, setResults, indexes, setIndexes}
}