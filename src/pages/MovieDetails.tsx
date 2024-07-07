import { useParams } from "react-router-dom"
import CommonMovieDetails from "../components/CommonDetailsPage"
import movies from '../data/movies.json'

const MovieDetails = () => {

  const {id} = useParams()
  const key = Number(id)

  return (
    <CommonMovieDetails movie={movies[key]}/>
  )
}

export default MovieDetails