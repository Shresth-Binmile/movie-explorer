import { Box, Button, Typography } from "@mui/material"
import Navbar from "../components/Navbar"
import MovieCard from "../components/CommonMovieCard"
import movies from '../data/movies.json'
import { useAuth } from "../utils/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
// import { useEffect } from "react"
// import { getCurrentUser } from "../utils/saveDataInDB"

const FavoriteMovies = () => {

  const {isLogin, user} = useAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState<number[]>([])
  const currentUser = useSelector((state:RootState)=>state.userReducer)

  useEffect(()=>{
    const results = []
    for(let i = 0; i < currentUser?.favorites?.length!; i++){
      const indx = movies.findIndex((movie)=>movie.imdbID === currentUser?.favorites![i])
      results.push(indx)
    }
    setFavorites(results)
  },[currentUser])

  if(isLogin === false){
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
      {
        favorites.length === 0 ? (<Typography mt={10} fontWeight={'bold'} textAlign={'center'} variant="h3" component={'h3'}>No Items in Favorites.</Typography>) : 
        (<Box sx={{ mt: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            // show the movies here...
            favorites.map((movie, indx)=>(
              <MovieCard key={indx} movie={movies[movie]} indx={movie} isLogin={isLogin} user={user!}/>
            ))
          }
        </Box>)
      }
    </>
  )
}

export default FavoriteMovies