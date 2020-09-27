import {combineReducers} from 'redux'
import {CLEAR_ON_HOME, GET_GENRES, GET_MOVIES, SEARCH, ADD_TO_FAVORITES} from '../actions-type/index'

const defaultStore = {
    movies: [],
    genres: [],
    curPage: 1,
    curGenre: '',
    searched: [],
    totalPage: '',
    totalResults: '',
    curSearchPage: '',
    favorites: []
};

export function mainReducer(store = defaultStore, action) {

    switch (action.type) {
        case GET_MOVIES: {
            const {payload, page, genre} = action;
            return {
                ...store,
                movies: payload,
                curPage: page,
                curGenre: genre || ''
            }
        }
        case GET_GENRES: {
            const {payload} = action;
            return {
                ...store,
                genres: payload
            }
        }
        case SEARCH: {

            const {payload, totalR,totalP, curPage} = action;
            return {
                ...store,
                searched  : payload,
                totalPage: totalP,
                totalResults: totalR,
                curSearchPage: curPage

            }
        }
        case CLEAR_ON_HOME: {
            return {
                ...store,
                curGenre: ''
            }
        }
        case ADD_TO_FAVORITES: {
            const {payload} =action;
            const {favorites} = store;
           const index = favorites.findIndex(value => value.id === payload.id);
           if (index === -1){
               return {
                   ...store,
                   favorites: [...favorites, payload]
               }
           }else if (index >= 0) {
               const FavoritesCopy = [...favorites];
               FavoritesCopy.splice(index,1);
               return {
                   ...store,
                   favorites: FavoritesCopy
               }
           }else return store
        }
        default: return store
    }

}

export const rootReducer = ()=>{
    return combineReducers(
        {
            mainReducer
        }
    )
}