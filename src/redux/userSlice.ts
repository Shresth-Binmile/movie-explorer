import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialStateInterface } from '../interfaces/StateInterfaces'
import { loginResponse } from '../interfaces/ResponseType'


const initialState:initialStateInterface = {
    name: '',
    favorites: [],
    comments: []
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        setInitialComments: (state, action) => {
            state.comments = action.payload
            // console.log('addcomments', state.comments)
        },
        addComments: (state, action) => {
            // code to add comment goes here
            // console.log('movieName: ', action.payload.movieName)
            state.comments = [...state.comments, action.payload]
            // state.comments = action.payload
            // console.log('addcomments', state.comments)
            // saving in Local Storage
            // const newData:loginResponse = {
            //     favorites: state.favorites,
            //     name: state.name
            // }
            // localStorage.setItem('currentUser', JSON.stringify(newData))
            // updateUser(newData)
        },
        addFavoritesRedux: (state, action) => {
            // code to add favorites goes here
            state.favorites = [...state.favorites, action.payload]
            const tempSet = new Set(state.favorites)
            state.favorites = [...tempSet]
            // console.log('addFavorite', state.favorites)
            // saving in Local Storage
            const currentUserLS = JSON.parse(localStorage.getItem('currentUser')!)
            const newData:loginResponse = {
                favorites: state.favorites,
                name: currentUserLS.name
            }
            localStorage.setItem('currentUser', JSON.stringify(newData))
            // updateUser(newData)
        },
        removeFavoritesRedux: (state, action) => {
            // code to remove favorites
            state.favorites = state.favorites.filter((favorite)=>{
                return favorite != action.payload
            })
            // console.log('removeFavorite', state.favorites)
            // saving in Local Storage
            const currentUserLS = JSON.parse(localStorage.getItem('currentUser')!)
            const newData:loginResponse = {
                favorites: state.favorites,
                name: currentUserLS.name
            }
            localStorage.setItem('currentUser', JSON.stringify(newData))
            // updateUser(newData)
        },
        setInitialState: (state, action: PayloadAction<loginResponse>) => {
            // code to set initial state
            state.name = action.payload?.name!
            // state.comments = action.payload.comments
            state.favorites = action.payload?.favorites!
        },
        logoutSetState: (state) => {
            // code to set initial state
            state.name = ''
            state.comments = []
            state.favorites = []
        }
    }
})

export const {addComments, addFavoritesRedux, removeFavoritesRedux, setInitialState, setInitialComments, logoutSetState} = userSlice.actions

export default userSlice.reducer