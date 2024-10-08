import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import { MovieData } from '../interfaces/MovieData';
import { addFavoritesRedux, removeFavoritesRedux } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import movies from '../data/movies.json'
import { loginResponse } from '../interfaces/ResponseType';
import { addFavorites, removeFavorites } from '../utils/manipulateDB';

// interface MovieCardProps {
//   movie: {
//     title: string;
//     image: string;
//     ratings: string;
//     // Add other relevant properties
//   };
//   onShowDetails: () => void;
//   onAddToFavorites: () => void;
// }

// , onShowDetails, onAddToFavorites

const MovieCard = ({ movie, indx, isLogin, user }: { movie: MovieData, indx: number, isLogin: boolean, user: loginResponse }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let isAdded = user?.favorites?.findIndex((i) => i === movie.imdbID)
    const location = useLocation().pathname
    let index = -1;

    useEffect(() => {
        isAdded = user?.favorites?.findIndex((i) => i === movie.imdbID)
        if (isAdded !== -1) {
            setIsFavorite(true)
        }
        else {
            setIsFavorite(false)
        }
    }, [isAdded])

    useEffect(() => {
        if (location === '/favorites') {
            setIsFavorite(true)
        }
    }, [isFavorite])

    const onAddToFavorites = async() => {

        // if (location == '/') {
        //     index = movies.findIndex((i) => i.Title === movie.Title)
        //     console.log(index)
        // }
        // else {
        //     index = indx
        // }
        if (location !== '/favorites') setIsFavorite(!isFavorite);
        // Implement your logic to add/remove from favorites
        // console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        if (!isFavorite && location !== '/favorites') {
            // console.log('Added to Favorites')
            await addFavorites(movie.imdbID)
            dispatch(addFavoritesRedux(movie.imdbID))
        }
        else {
            // console.log('Removed from Favorites')
            await removeFavorites(movie.imdbID)
            dispatch(removeFavoritesRedux(movie.imdbID))
        }
    };

    const onShowDetails = () => {
        if (location == '/') {
            index = movies.findIndex((i) => i.Title === movie.Title)
            // console.log(index)
        }
        else {
            index = indx
        }
        // console.log('Show Details Button Clicked')
        // console.log(indx)
        navigate(`/details/${index}`)
    }

    return (
        <Card sx={{
            my: 1,
            width: '98%',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            minHeight: 50,
            maxHeight: { lg: 400, xs: 650 },
            '&:hover': {
                boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            },
            p: { xs: 1, sm: 2, md: 3 },
        }}>
            <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, cursor: 'default' }}>
                <CardMedia
                    component="img"
                    image={movie.Poster}
                    alt={movie.Title}
                    sx={{
                        maxWidth: { xs: '100%', sm: '30%' },
                        maxHeight: { lg: 300, xs: 250 },
                        objectFit: 'contain',
                        mb: { xs: 2, sm: 0 },
                    }}
                />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ml: { xs: 0, sm: 2 } }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                            {movie.Title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <b>Description</b>: {movie.Plot}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <b>Genre</b>: {movie.Genre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <b>Actors</b>: {movie.Actors}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Year</b>: {movie.Year}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <b>Ratings</b>: {movie.imdbRating}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
                        <Button size="small" color="primary" onClick={onShowDetails}>
                            Show Details
                        </Button>
                        {
                            isLogin ? (
                                <Button
                                    variant={isFavorite || isAdded !== -1 ? 'outlined' : 'contained'}
                                    size="small"
                                    color="primary"
                                    onClick={onAddToFavorites}
                                >
                                    {isAdded !== -1 || isFavorite || location === '/favorites' ? 'Remove from favorites' : 'Add to favorites'}
                                </Button>
                            ) : (<></>)
                        }
                    </CardActions>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default MovieCard;
