import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Userdata } from '../interfaces/Userdata'
import { initialStateInterface } from '../interfaces/StateInterfaces'
import { updateUser } from '../utils/saveDataInDB'


const initialState:initialStateInterface = {
    name: '',
    ratings: [],
    favorites: [],
    comments: []
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        addComments: (state, action) => {
            // code to add comment goes here
            // console.log('movieName: ', action.payload.movieName)
            state.comments = [...state.comments, action.payload]
            console.log('addcomments', state.comments)
            // saving in Local Storage
            const newData:initialStateInterface = {
                comments: state.comments,
                favorites: state.favorites,
                ratings: state.ratings,
                name: state.name
            }
            updateUser(newData)
        },
        addFavorites: (state, action) => {
            // code to add favorites goes here
            state.favorites = [...state.favorites, action.payload]
            const tempSet = new Set(state.favorites)
            state.favorites = [...tempSet]
            console.log('addFavorite', state.favorites)
            // saving in Local Storage
            const newData:initialStateInterface = {
                comments: state.comments,
                favorites: state.favorites,
                ratings: state.ratings,
                name: state.name
            }
            updateUser(newData)
        },
        submitRatings: (state, action) => {
            // code to submit ratings
            const indx = state.ratings.findIndex((i)=>i.movieName === action.payload.movieName)
            // console.log(indx)
            if(indx == -1){
                state.ratings = [...state.ratings, action.payload]
                console.log('StateRatings: ', state.ratings)
            }
            else{
                state.ratings[indx].value = action.payload.value
                console.log('StateRatings: ', state.ratings[indx].movieName, state.ratings[indx].value)
            }
            // saving in Local Storage
            const newData:initialStateInterface = {
                comments: state.comments,
                favorites: state.favorites,
                ratings: state.ratings,
                name: state.name
            }
            updateUser(newData)
        },
        removeFavorites: (state, action) => {
            // code to remove favorites
            state.favorites = state.favorites.filter((favorite)=>{
                return favorite != action.payload
            })
            console.log('removeFavorite', state.favorites)
        },
        setInitialState: (state, action: PayloadAction<Userdata>) => {
            // code to set initial state
            state.name = action.payload.user.name
            state.comments = action.payload.comments
            state.favorites = action.payload.favorites
        },
        logoutSetState: (state) => {
            // code to set initial state
            state.name = ''
            state.comments = []
            state.favorites = []
        }
    }
})

export const {addComments, addFavorites, removeFavorites, setInitialState, submitRatings, logoutSetState} = userSlice.actions

export default userSlice.reducer