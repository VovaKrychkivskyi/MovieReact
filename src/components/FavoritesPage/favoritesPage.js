import React, {Component} from 'react';
import {connect} from "react-redux";
import {MovieListCard} from "../MoviesListCard/MovieListCard";
import {DarkThemeContext} from "../../context/contexts";

class FavoritesPageComponent extends Component {
    static contextType = DarkThemeContext;
    render() {
        const darkTheme = this.context;
        const {favorites} = this.props;
        return (

                <div className={darkTheme.isDarkTheme && 'bg-dark'}>
                    <div>
                        <div className="list-group transition justify-content-center">

                            <span className={`list-group-item list-group-item-action ${!!favorites.length? "list-group-item-info" : 'list-group-item-warning'}  d-flex justify-content-around `}>
                                {!!favorites.length
                                    ? `${favorites.length} movie${favorites.length === 1? '': 's' } in your list`
                                    : 'your list is empty'
                                }
                            </span>
                    </div>
                        {darkTheme.isDarkTheme && favorites.length === 0 && <div className='bg-dark' style={{"height": "90vh"}}></div>}
                        </div>
                    <div className='col-10 d-flex flex-row flex-wrap container justify-content-center'>
                        {favorites.map(value => <MovieListCard movie={value}/>)}
                    </div>
                </div>
        );
    }
}
const mapStateToProps = (store)=>{
    const {mainReducer: {favorites}} = store
    return {
        favorites
    }
};
export const FavoritesPage = connect(mapStateToProps)(FavoritesPageComponent);

