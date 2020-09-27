import {GET_GENRES, GET_MOVIES, SEARCH, CLEAR_ON_HOME, ADD_TO_FAVORITES} from '../actions-type/index'

export const getMovies = (arr, page, genre)=>{
    return{
        type: GET_MOVIES,
        payload: arr,
        page: page,
        genre: genre
    }
};
export const getGenres = (arr)=>{
    return{
        type: GET_GENRES,
        payload: arr
    }
};
export const getSearched = (searched, totalP, totalR, page)=>{
    return {
        type: SEARCH,
        payload: searched,
        totalR: totalR,
        totalP: totalP,
        curPage: page
    }
};
export const clearOnHome = ()=>{
    return {
        type: CLEAR_ON_HOME
    }
};

export const addToFavorites = (movie)=>{
    return {
        type: ADD_TO_FAVORITES,
        payload: movie
    }
};