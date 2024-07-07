import { Box, Button, TextField, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
// import { useSelector } from "react-redux"
// import { RootState } from "../redux/store"
import MovieCard from "../components/CommonMovieCard"
import movies from '../data/movies.json'
import { useSearchBar } from "../utils/useSearchBar"
import { useAuth } from "../utils/useAuth"
import { useNavigate } from "react-router-dom"

const FavoriteMovies = () => {

  // const userState = useSelector((state: RootState) => state.userReducer.name)
  const {searchText, setSearchText, indexes} = useSearchBar()
  const {isLogin} = useAuth()
  const navigate = useNavigate()
  const isLoggedIn = isLogin

  if(isLoggedIn === false){
    return (
      <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 10}}>
        <Navbar />
        <Typography textAlign={"center"} fontWeight={'Bold'} fontSize={50}>Login first!!</Typography>
        <Button color="primary" variant="contained" onClick={()=>navigate('/login')}>Login</Button>
      </Box>
    )
  }

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box>
          <TextField
            id="standard-basic"
            placeholder="Search"
            variant="standard"
            fullWidth
            sx={{ width: 500 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {
            searchText && <Typography textAlign={"center"}>Showing Results for "{searchText}"</Typography>
          }
        </Box>
        {
          indexes.map((movie) => (
            <MovieCard movie={movies[movie]} indx={movie} key={movie}/>
          ))
        }
      </Box>
    </>
  )
}

export default FavoriteMovies