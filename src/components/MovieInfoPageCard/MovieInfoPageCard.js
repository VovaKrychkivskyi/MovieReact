import React, {Component} from 'react';
import {BackgroundImage} from "../../MovieINFOcomponents/BackGroundImage/BackgroundImage";
import {connect} from "react-redux";
import {StartRating} from "../../MovieINFOcomponents/StarsRating/StartRating";
import {DefaultBackground} from "../defaultImages/defaultBackground";
import {GenreBadge} from "../../MovieINFOcomponents/GenreBadge/genreBadge";
import {Budget} from "../../MovieINFOcomponents/budgetComponent/Budget";
import {ImdBhref} from "../../MovieINFOcomponents/IMDbhref/IMDBhref";
import {MovieInfo} from "../../MovieINFOcomponents/MovieInfo/MovieInfo";
import {PosterPreview} from "../../MovieINFOcomponents/PosterPreview/posterPreview";
import {addToFavorites} from "../../store/actions";
import {FooterNavigator} from '../../MovieINFOcomponents/footerNavigator/footerNavigator'

import './MoviePageCardStyle.scss'

export class MovieInfoPageCardComponent extends Component {

    onAddToFavorites = ()=>{
        const {addToFavorites, movie} = this.props;
        addToFavorites(movie);
    };
    render() {
        const {movie, favorites} = this.props;
        const {backdrop_path,
            title,
            tagline,
            vote_average,
            vote_count,
            genres: genreArr,
            budget,
            revenue,
            imdb_id,
            poster_path,
            status,
            release_date,
            original_language
        } = movie;
        return (
            <div className='container'>
                {!!backdrop_path
                    ?  <BackgroundImage background_Path={backdrop_path}/>
                    :  <DefaultBackground/>
                }
                <div className="jumbotron bg-info">
                    <h1 >{title}</h1>
                    <p className="lead">{tagline}</p>
                    <div className='align-self-end'>
                        <div className='row justify-content-between p-2 align-items-center'>
                            <GenreBadge genres={genreArr}/>
                            <button className={favorites.find(value => value.id === movie.id)? 'btn btn-success' :'btn btn-secondary'}
                                    onClick={this.onAddToFavorites}>
                                {favorites.find(value => value.id === movie.id)? 'added to favorites' :'add to favorites'}
                            </button>
                        </div>

                    </div>
                    <hr className="my-2 d-flex"/>
                    <div className='justify-content-around d-flex' >
                        <div >
                            <StartRating rating={vote_average}/>
                            <span className="badge badge-dark m-3 align-self-baseline">{vote_count}</span>
                        </div>
                        <Budget budget={budget} label={'budget:'}/>
                        <Budget budget={revenue} label={'revenue:'}/>
                        <ImdBhref href={imdb_id}/>
                    </div>
                    <hr className="my-2 d-flex"/>
                </div>

                <div className='d-flex flex-row flex-wrap m-3'>
                    <div className='col-lg-4 col-md-12 justify-content-center'>
                        <PosterPreview posterPath={poster_path}/>
                    </div>
                    <div className='col-lg-8 col-md-12'>

                        <MovieInfo movie={movie} flag={true}/>
                        <div className='p-3'>
                            <div>
                                <h5>Status: {status}</h5>
                            </div>
                            <div>
                                <h5>Release date: {release_date} </h5>
                            </div>
                            <div className='d-flex'>
                                <h6>Language:</h6>
                                <div className='badge badge-info'>{original_language}</div>
                            </div>
                        </div>
                    </div>
                </div>
               <FooterNavigator/>
            </div>
        );
    }
}
const mapDispatchToProps = ({
    addToFavorites
});
const mapStateToProps = (store)=>{
    const {mainReducer: {favorites}} = store;
    return{
        favorites
    }
};
export const MovieInfoPageCard = connect(mapStateToProps, mapDispatchToProps)(MovieInfoPageCardComponent)
