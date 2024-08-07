import { useEffect, useState } from 'react';
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
// import { addComments, submitRatings } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
// import { ratings } from '../interfaces/StateInterfaces';
import Navbar from './Navbar';
import { useAuth } from '../utils/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { addCommentsAndRatings, addFavorites, getCommentsAndRatings, removeFavorites } from '../utils/manipulateDB';
// import { getCurrentUserFromLS } from '../utils/saveDataInDB';
import { CommentsResponse } from '../interfaces/ResponseType';
import { addComments, addFavoritesRedux, removeFavoritesRedux, setInitialComments } from '../redux/userSlice';
import toast from 'react-hot-toast';
// import { RootState } from '../redux/store';

const CommonMovieDetails = ({ movie }: MovieDetails) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [commentCount, setCommentCount] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false);
    const { isLogin, userState } = useAuth()
    const dispatch = useDispatch()
    const theme = useTheme();
    // const currentUser:any = getCurrentUserFromLS()
    let isAdded = userState?.favorites?.findIndex((i:string) => i === movie.imdbID)
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [commArr, setCommArr] = useState<CommentsResponse[]>([])

    useEffect(()=>{
        // console.log('commArr', commArr)
        dispatch(setInitialComments(commArr))
        const fetchComments = async() => {
            const updatedCommentsArray = await getCommentsAndRatings(movie.imdbID)
            setCommArr(updatedCommentsArray)
        }
        fetchComments()
    }, [commentCount])

    useEffect(() => {
        // console.log(isAdded)
        isAdded = userState?.favorites?.findIndex((i:string) => i === movie.imdbID)
        if (isAdded !== -1) {
            setIsFavorite(true)
        }
        else {
            setIsFavorite(false)
        }
    }, [isAdded, isLogin, isFavorite])

    const handleAddComment = async() => {
        if (isLogin) {
            if (!rating) {
                toast.error('Both Comments & Ratings must be provided')
            }
            else {
                await addCommentsAndRatings(movie.imdbID, comment, rating)
                const newObj = {
                    imdbID: movie.imdbID,
                    comments: comment,
                    ratings: rating
                }
                dispatch(addComments(newObj))
                setComment('');
                const comments = await getCommentsAndRatings(movie.imdbID)
                setCommArr(comments)
                // console.log('commentArr: ', comments)
                setRating(null)
                setCommentCount(!commentCount)
            }
        }
        else {
            toast.error('Login First')
        }
    };

    const handleRatingChange = (newValue: number | null) => {
        if (isLogin) {
            setRating(newValue);
            // const newratingObject: ratings = {
            //     movieName: movie.Title,
            //     value: newValue!
            // }
            // dispatch(submitRatings(newratingObject))
        }
        else {
            toast.error('Login First')
        }
    };

    const handleToggleFavorite = async() => {
        if (isLogin) {
            // console.log(isFavorite)
            setIsFavorite(!isFavorite);
            if (!isFavorite && isAdded == -1) {
                // console.log('Added')
                await addFavorites(movie.imdbID)
                dispatch(addFavoritesRedux(movie.imdbID))
                setIsFavorite(!isFavorite)
                // console.log(isFavorite)
            }
            else {
                // console.log('removed')
                await removeFavorites(movie.imdbID)
                dispatch(removeFavoritesRedux(movie.imdbID))
                setIsFavorite(!isFavorite)
                // console.log(isFavorite)
            }
        }
        else {
            toast.error('Login First')
        }
    };

    // console.log(commArr)

    return (
        <>
            <Navbar />
            <Box sx={{ maxWidth: 700, margin: 'auto', mt: 10 }}>
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
                        <Typography variant="h6" component={'h6'}>Rate This Movie:</Typography>
                        <Rating
                            name="movie-rating"
                            value={rating}
                            onChange={(_event, newValue) => {
                                handleRatingChange(newValue);
                            }}
                        />
                    </Box>
                    <Box>
                        {
                            isLogin ? (
                                <Button
                                    variant={isFavorite && isAdded !== -1 ? 'outlined' : 'contained'}
                                    color="secondary"
                                    onClick={handleToggleFavorite}
                                    fullWidth={isSmallScreen}
                                >
                                    {
                                        isFavorite && isAdded !== -1 ? 'Remove from Favorites' : 'Add to Favorites'
                                    }
                                </Button>
                            ) : (
                                <Button
                                    variant={'contained'}
                                    color="secondary"
                                    onClick={handleToggleFavorite}
                                    fullWidth={isSmallScreen}
                                >
                                    Add to Favorites
                                </Button>
                            )
                        }
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Box>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={2}
                            // fullWidth
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add your comment..."
                            sx={{ mb: 2, minWidth: '75%' }}
                        />
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleAddComment}
                    // sx={{ ml: 2 }}
                    >
                        Add Comment
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box>
                    <Typography variant="h5" mb={3}>Comments:</Typography>
                    {
                        commArr?.map((comment:CommentsResponse, indx) => {
                            return (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        maxWidth: '100%',
                                        padding: 2,
                                        marginBottom: 2,
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: 8,
                                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                    }}
                                    key={indx}
                                >
                                    <AccountCircleIcon sx={{ fontSize: 40, marginRight: 2 }} />
                                    <Box sx={{ flex: 1 }}>
                                        {/* <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                            {user[0].user.name}
                                        </Typography> */}
                                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                            {comment?.comments}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Rating: {comment?.ratings}
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" sx={{ mx: 2, height: 'auto' }} />
                                </Box>
                            )
                        })
                    }
                </Box>

            </Box>
        </>
    );
};

export default CommonMovieDetails;