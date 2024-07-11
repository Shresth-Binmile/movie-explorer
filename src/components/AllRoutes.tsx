import { HashRouter as Router, Routes, Route } from "react-router-dom"
import MovieListing from "../pages/MovieListing"
import Login from "../pages/Login"
import Register from "../pages/Register"
import FavoriteMovies from "../pages/FavoriteMovies"
import MovieDetails from "../pages/MovieDetails"

const AllRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MovieListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<FavoriteMovies />} />
            <Route path="/details/:id" element={<MovieDetails />} />
        </Routes>
    </Router>
  )
}

export default AllRoutes