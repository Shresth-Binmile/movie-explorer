import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Divider,
    Rating,
    useTheme,
    useMediaQuery,
    Grid,
} from '@mui/material';
import { MovieDetails } from '../interfaces/MovieData';
import { addComments, addFavorites, removeFavorites, submitRatings } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { comments } from '../interfaces/Userdata';
import { ratings } from '../interfaces/StateInterfaces';
import Navbar from './Navbar';
// import { useAuth } from '../utils/useAuth';

const CommonMovieDetails = ({ movie }: MovieDetails) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch()
    const { id } = useParams()
    const theme = useTheme();
    // const {isLogin, userState} = useAuth()
    // const isLoggedIn = isLogin
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAddComment = () => {
        // Implement your logic to save comment
        // console.log('Comment:', comment);
        const newComment: comments = {
            movieName: movie.Title,
            comment
        }
        dispatch(addComments(newComment))
        setComment('');
    };

    const handleRatingChange = (newValue: number | null) => {
        setRating(newValue);
        const newratingObject: ratings = {
            movieName: movie.Title,
            value: newValue!
        }
        console.log('page: ', newratingObject)
        dispatch(submitRatings(newratingObject))
    };

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Implement your logic to add/remove from favorites
        console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        if (!isFavorite) {
            console.log('Added to Favorites')
            // console.log('id', Number(id))
            dispatch(addFavorites(Number(id)))
        }
        else {
            console.log('Removed from Favorites')
            dispatch(removeFavorites(Number(id)))
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ maxWidth: 600, margin: 'auto', mt: 10 }}>
                <Typography variant="h4" gutterBottom align="center">
                    {movie.Title} ({movie.Year})
                </Typography>

                <Grid container spacing={isSmallScreen ? 2 : 4}>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{ textAlign: 'left' }}>
                        <Typography variant="body1">Rated: {movie.Rated}</Typography>
                        <Typography variant="body1">Runtime: {movie.Runtime}</Typography>
                        <Typography variant="body1">Genre: {movie.Genre}</Typography>
                        <Typography variant="body1">Director: {movie.Director}</Typography>
                        <Typography variant="body1">Actors: {movie.Actors}</Typography>
                        <Typography variant="body1">Plot: {movie.Plot}</Typography>
                        <Typography variant="body1">Language: {movie.Language}</Typography>
                        <Typography variant="body1">Country: {movie.Country}</Typography>
                        <Typography variant="body1">Awards: {movie.Awards}</Typography>
                        <Typography variant="body1">Box Office: {movie.BoxOffice}</Typography>
                        <Typography variant="body1">Production: {movie.Production}</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h5">Rate This Movie:</Typography>
                        <Rating
                            name="movie-rating"
                            value={rating}
                            onChange={(_event, newValue) => {
                                handleRatingChange(newValue);
                            }}
                        />
                    </Box>
                    <Box>
                        <Button
                            variant={isFavorite ? 'outlined' : 'contained'}
                            color="secondary"
                            onClick={handleToggleFavorite}
                            fullWidth={isSmallScreen}
                        >
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="h5">Comments:</Typography>
                    <TextField
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add your comment..."
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }} />


            </Box>
        </>
    );
};

export default CommonMovieDetails;