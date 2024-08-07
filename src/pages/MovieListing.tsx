import { Box, TextField, Typography } from "@mui/material"
import MovieCard from "../components/CommonMovieCard"
import Navbar from "../components/Navbar"
import { useSearchBar } from "../utils/useSearchBar"
import { useAuth } from "../utils/useAuth"
import { useEffect } from "react"
// import { useFetchApi } from "../utils/fetchApi"

const MovieListing = () => {

  const {searchText, setSearchText, results} = useSearchBar()
  const { isLogin, user } = useAuth()
  // const {movies} = useFetchApi()
  // console.log(movies)
  useEffect(()=>{
    // here goes nothing...
  }, [user])

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
            sx={{ maxWidth: 500, minWidth: 300 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {
            searchText && <Typography textAlign={"center"}>Showing Results for "{searchText}"</Typography>
          }
        </Box>
        {
          results?.map((movie, index) => (
            <MovieCard movie={movie} indx={index} key={index} isLogin={isLogin} user={user!}/>
          ))
        }
      </Box>
    </>
  )
}

export default MovieListing