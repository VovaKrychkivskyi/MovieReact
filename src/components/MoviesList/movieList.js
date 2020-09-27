import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getGenres,getMovies} from '../../store/actions/index'
import {MovieListCard} from "../MoviesListCard/MovieListCard";
import {PaginationComponent} from '../Pagination/PaginationComponent'
import {key} from "../../constants";
import {SpinnerBLosks} from "../spinners/spinnerPage";
import {Collapse} from './collapse'
import querySring from 'query-string'
import {DarkThemeContext} from "../../context/contexts";
import {ViewPortContext} from "../../context/contexts";

class MovieListComponent extends Component {
    state = {
        isDownloading: false,
        isDownloaded: false,
        error: '',
        genreDownloading: false
    };
    componentDidMount() {
        console.log('render');
        const {match: {params: {page}},location: {search}} = this.props;
        if (this.props.curPage !== page) {
            this.fetchGenres();
            this.fetchMovies();
        }else {
            this.setState({
                isDownloading: false,
                isDownloaded: true,
                error: '',
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevSearch = querySring.parse(prevProps.location.search);
        let curSearch = querySring.parse(this.props.location.search);
        if ((prevProps.match.params.page !== this.props.match.params.page)||(prevSearch.genre !== curSearch.genre)){
            this.fetchMovies();
        }else return
    }

    fetchGenres = async ()=>{
        console.log('fetch genres');
        const {getGenres} = this.props;
        this.setState({
            isDownloading: true,
            genreDownloading: true
        });
        const response =  await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`);
        let json = await response.json();
        if (Array.isArray(json.genres)){
            this.setState({
                genreDownloading: false
            });
            getGenres(json.genres);
        }else    {
            this.setState({
                error: json.errors,
            })
        }
    };
    fetchMovies = async ()=>{
        console.log('fetch movies');
        const {match: {params: {page}}, location: {search}, curGenre} = this.props;
        let searched = querySring.parse(search);
        const {getMovies} = this.props;
        this.setState({
            isDownloading: true
        });
       const response =  await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&include_adult=true${!!search? `&with_genres=${searched.genre}`: ''}`);
       let json = await response.json();
       if (json.page){
           getMovies(json.results, page, searched.genre);
           this.setState({
               isDownloading: false,
               isDownloaded: true,
               error: ''
           })
       }else    {
           this.setState({
               isDownloaded: false,
               error: json.errors
           })
       }
    };
    static contextType = DarkThemeContext;
 
    render() {
        const darkTheme = this.context;
        const {error,isDownloaded,isDownloading, genreDownloading} =this.state;
        const {movies, genres} = this.props;
        return (
            <div className={` h-100 flex-wrap d-flex justify-content-center ${darkTheme.isDarkTheme? "bg-dark text-white": "bg-white text-dark"}`}>
                {!isDownloaded && !!error && <div>{error}</div>}

                {!genreDownloading && !error &&
                <div className='col-2'>
                    <Collapse/>
                </div>
                }
                    {isDownloading && <SpinnerBLosks/>}
                {isDownloaded && !isDownloading && !error &&
                <div className='container- col-xl-10 col-sm-12 d-flex flex-row flex-wrap container justify-content-center'>
                {movies.map(movie => <MovieListCard movie={movie} key={movie.id}/>)}
                </div>
                }
                {isDownloaded && !isDownloading && !error &&
                <div className='container row justify-content-center '>
                <PaginationComponent url={/page/}/>
                </div>
                }
            </div>
        );
    }
}
const mapDispatchToProps = ({
    getGenres,
    getMovies,
});
const mapStateToProps = (store)=>{
    const {mainReducer: {movies, curPage, genres, curGenre}} = store;
    return{
        movies,
        curPage,
        genres,
        curGenre
    }
};

export const MovieList = connect(mapStateToProps, mapDispatchToProps)(MovieListComponent);