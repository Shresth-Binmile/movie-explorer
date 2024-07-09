import { Box, Button, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
import MovieCard from "../components/CommonMovieCard"
import movies from '../data/movies.json'
import { useSearchBar } from "../utils/useSearchBar"
import { useAuth } from "../utils/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getCurrentUser } from "../utils/saveDataInDB"

const FavoriteMovies = () => {

  const { indexes, setIndexes} = useSearchBar()
  const {isLogin} = useAuth()
  const navigate = useNavigate()
  const isLoggedIn = isLogin

  useEffect(()=>{
    setIndexes(getCurrentUser()[0]?.favorites)
  }, [indexes])

  if(isLoggedIn === false){
    return (
      <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: 10}}>
        <Navbar />
        <Typography textAlign={"center"} fontWeight={'Bold'} fontSize={50}>Login first!!</Typography>
        <Button color="primary" variant="contained" onClick={()=>navigate('/login')}>Login</Button>
      </Box>
    )
  }
  
  if(indexes.length === 0){
    return (
      <Box>
        <Navbar />
        <Typography textAlign={"center"} sx={{
          mt: 10,
          fontSize: {md: 40, xs: 20, sm: 30},
        }}>No Items In Favorites</Typography>
      </Box>
    )
  }

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* <Box> // Search Adds Here...
          <TextField
            id="standard-basic"
            placeholder="Search"
            variant="standard"
            fullWidth
            sx={{ maxWidth: 500, minWidth: 300}}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {
            searchText && <Typography textAlign={"center"}>Showing Results for "{searchText}"</Typography>
          }
        </Box> */}
        {
          indexes?.map((movie) => (
            <MovieCard movie={movies[movie]} indx={movie} key={movie}/>
          ))
        }
      </Box>
    </>
  )
}

export default FavoriteMovies