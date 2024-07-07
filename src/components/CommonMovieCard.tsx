import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import { MovieData } from '../interfaces/MovieData';
// import { useState } from 'react';
import { addFavorites, removeFavorites } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const MovieCard = ({ movie, indx }: { movie: MovieData, indx: number }) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onAddToFavorites = () => {
        setIsFavorite(!isFavorite);
        // Implement your logic to add/remove from favorites
        console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        if (!isFavorite) {
            console.log('Added to Favorites')
            // console.log('id', Number(id))
            dispatch(addFavorites(indx))
        }
        else {
            console.log('Removed from Favorites')
            dispatch(removeFavorites(indx))
        }
    };

    const onShowDetails = () => {
        // console.log('Show Details Button Clicked')
        console.log(indx)
        navigate(`/details/${indx}`)
    }

    return (
        <Card sx={{ my: 1, width: '98%', height: 300, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <CardMedia
                    component="img"
                    height="100%"
                    width="auto"
                    image={movie.Poster}
                    alt={movie.Title}
                    sx={{
                        maxWidth: { xs: '100%', sm: '30%' },
                        objectFit: 'contain',
                    }}
                />
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontWeight={'Bold'}>
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
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
                        <Button
                            variant={isFavorite ? 'outlined' : 'contained'}
                            size="small"
                            color="primary"
                            onClick={onAddToFavorites}
                        >
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>
                    </CardActions>
                </Box>
            </CardActionArea>
        </Card>
    );
};

export default MovieCard;
