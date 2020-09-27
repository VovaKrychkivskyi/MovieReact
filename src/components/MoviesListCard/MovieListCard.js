import React, {Component} from 'react';
import {connect} from 'react-redux'


import {StartRating} from "../../MovieINFOcomponents/StarsRating/StartRating";
import {GenreBadge} from "../../MovieINFOcomponents/GenreBadge/genreBadge";
import {PosterPreview} from "../../MovieINFOcomponents/PosterPreview/posterPreview";
import {MovieInfo} from '../../MovieINFOcomponents/MovieInfo/MovieInfo'
import {DefaultPoster} from "../defaultImages/defaultPoster";
import {withRouter} from "react-router";
import {addToFavorites} from "../../store/actions";

import './CustomCardStyle.css'
import {DarkThemeContext} from "../../context/contexts";

export class MovieListCardComponent extends Component {
    state = {
        genres: [],
    };

   componentDidMount() {
       this.getGenresForCard()
   }
   getGenresForCard = ()=>{
       const {genres} = this.props;
       if (!genres) return;
        const {movie: {genre_ids}} =  this.props;
        if (!genre_ids) return;
       let arr = [];
       genre_ids.forEach(id => arr.push(genres.find(value=>value.id === id)));
        this.setState({
            genres: arr
        })
   };
    componentDidUpdate(prevProps, prevState, snapshot) {
    }
goSpecify = (event)=>{
    if (!(this.addRef.current.contains(event.target))) {
        const {history, movie: {id}} = this.props;
        history.push(`/movie/${id}`)
    } else return
};
    onAdd = (event)=>{
        const {addToFavorites, movie} = this.props;
        console.log(movie);
        addToFavorites(movie)
    };
addRef = React.createRef();
    static contextType = DarkThemeContext;
    render(){
        const darkTheme = this.context;
        const {genres} =  this.state;
        const {movie, favorites, location:{pathname}} = this.props;
        if (!movie) return null;
        const {vote_average, poster_path} = movie;
        return (
            <div className={`card cardCustom ${darkTheme.isDarkTheme? "bg-secondary": ""}`}
                 onClick={this.goSpecify}>
                    <div className="card-body p-0">
                        <div className='justify-content-center d-flex '>
                            {!!poster_path
                                ? <PosterPreview posterPath={poster_path}/>
                                : <DefaultPoster/>
                            }
                        </div>
                        {pathname !== "/favorites" &&
                            <GenreBadge genres={genres}/>
                        }
                        <MovieInfo movie={movie}/>
                    </div>
                <div className="card-footer d-flex justify-content-between">
                    {pathname !== "/favorites" && [
                        <StartRating rating={vote_average}/>,
                        <button className={favorites.find(value => value.id === movie.id)? 'btn btn-success' :'btn btn-info'}
                        ref={this.addRef}
                        onClick={this.onAdd}>
                            {favorites.find(value => value.id === movie.id)? 'added' :'add'}
                        </button>
                    ]}
                    {pathname === "/favorites" &&
                    <button className='btn btn-danger'
                            ref={this.addRef}
                            onClick={this.onAdd}>
                       remove
                    </button>
                    }
                </div>
            </div>
        );
    }
}
const mapDispathToProps = ({
    addToFavorites
});
const mapStateToProps = (store)=>{
    const {mainReducer: {genres, favorites}} = store;
    return {
        genres,
        favorites,
    }
};

export const MovieListCard = connect(mapStateToProps, mapDispathToProps)(withRouter(MovieListCardComponent));