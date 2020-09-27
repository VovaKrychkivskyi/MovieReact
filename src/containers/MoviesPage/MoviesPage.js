import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import {Provider} from 'react-redux'
import {MovieDBstore} from '../../store/MovieDB'
import 'react-bootstrap'
import {Header} from "../../components/Header/Header";
import {MovieList} from "../../components/MoviesList/movieList"
import {MovieInfoPage} from "../../components/MovieInfoPage/MovieInfoPage";
import {SearchPage} from "../../components/search/SearchPage";
import {FavoritesPage} from "../../components/FavoritesPage/favoritesPage";
import {DarkThemeWraper} from "../../context/wrappers/DarkThemeWraper";
import {DetectViewPortWrapper} from "../../context/wrappers/DetectViewPortWrapper";

import 'bootstrap/dist/css/bootstrap.min.css';

class MoviesPage extends Component {
    render() {
        return (
            <DetectViewPortWrapper>
            <DarkThemeWraper>
            <Provider store={MovieDBstore}>
            <Router>
                <Header/>
                <Switch>
                    <Route path='/page/:page'
                           component={MovieList}
                    ></Route>
                    <Route path='/movie/:movieID'
                             render={(routerProps)=>{
                                 return   (<MovieInfoPage  {...routerProps}/>)
                             }}/>
                    <Route path='/search/:page'
                           render={(routerProps)=>{
                               return   (<SearchPage  {...routerProps}/>)
                           }}/>
                    <Route path='/favorites'
                           component={FavoritesPage}
                    ></Route>
                    <Redirect from='/' to='/page/1'/>
                </Switch>
            </Router>
            </Provider>
                </DarkThemeWraper>
                </DetectViewPortWrapper>
        );
    }
}
export default MoviesPage;