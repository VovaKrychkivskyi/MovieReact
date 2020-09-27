import React, {Component} from 'react'
import {SpinnerBLosks} from "../spinners/spinnerPage";
import {key} from "../../constants";
import {MovieListCard} from "../MoviesListCard/MovieListCard";
import {PaginationComponent} from "../Pagination/PaginationComponent";
import queryString from 'query-string'
import {connect} from "react-redux";
import {getSearched} from "../../store/actions";
import {DarkThemeContext} from "../../context/contexts";

import './searchStyle.css'


class SearchPageComponent extends Component {
    state = {
        isDownloading:false,
        isDownloaded: false,
        error: '',
    };
    componentDidMount() {
        const {match: {params: {page}}} = this.props;
        if (this.props.curSearchPage !== page) {
            this.fetchID()
        }else {
            this.setState({
                isDownloading: false,
                isDownloaded: true,
                error: '',
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevSearch = queryString.parse(prevProps.location.search);
        let curSearch = queryString.parse(this.props.location.search);
        if ((prevProps.match.params.page !== this.props.match.params.page)||(prevSearch.keyword !== curSearch.keyword)){
            this.fetchID()
        }else return
    }
    fetchID = async ()=>{
        this.setState({
            isDownloading: true,
            isDownloaded: false
        });
        const {match: {params: {page}}, location: {search}, getSearched} = this.props;
        const searched = queryString.parse(search);
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searched.keyword}&page=${page}`);
    debugger
        if (response.ok) {
            let json = await response.json();
            const {total_pages, total_results} = json;
            getSearched(json.results, total_pages, total_results,page);
            this.setState({
                isDownloading:false,
                isDownloaded: true,
                error: ''
            });
        }else {
            this.setState({
                isDownloading: false,
                isDownloaded: false,
                error: `error code: ${response.status}`
            })
        }
    };
    static contextType = DarkThemeContext;
    render() {
        const darkTheme = this.context;
        const {isDownloading,isDownloaded,error} = this.state;
        const {searched, totalResults, totalPage, location: {search}}= this.props;
        let keyword = queryString.parse(search);
        return (
            <div>
                {isDownloaded &&
                <div className="list-group transition">

                    <span className={`list-group-item list-group-item-action ${!!searched.length? "list-group-item-info" : 'list-group-item-warning'}  d-flex justify-content-around `}>
                        {searched.length === 0 &&  <h5 className='m-2'>nothin was found for '{keyword.keyword}'</h5> }
                        {searched.length >= 1 && [
                        <h5 className='m-2'>Search for '{keyword.keyword}'</h5>,
                        <h5 className='m-2'>total results - {totalResults}</h5>,
                            <h5 className='m-2'>total pages = {totalPage}</h5>
                            ]
                        }
                        {!!error && <h5 className='m-2'>{error}</h5> }

                    </span>
                </div>
                }
                {darkTheme.isDarkTheme && searched.length === 0 && <div className='bg-dark' style={{"height": "90vh"}}></div>}
                <div className={`flex-wrap d-flex flex-row  h-100
                            container-fluid
                            justify-content-center
                            ${darkTheme.isDarkTheme? 'bg-dark': 'bg-white'}
                            `}>
                    {isDownloading && !isDownloaded && <SpinnerBLosks/> }
                    {!isDownloading && !isDownloaded && <div>{error}</div> }
                    {!isDownloading && isDownloaded && !error && searched.map(value => { return <MovieListCard movie={value} key={value.id}/>}) }

                </div>
                {!isDownloading && isDownloaded && !error && searched.length >= 1 &&
                <div className={`flex-row  ${darkTheme.isDarkTheme? 'bg-dark': 'bg-white'}`}>
                    <PaginationComponent url={'/search/'} pages={totalPage}/>
                </div>
                    }
            </div>
        );
    }
}
const mapStateToProps = (store)=>{
    const {mainReducer: {searched, totalPage, totalResults, curSearchPage}} = store;
    return {
        searched,
        totalResults,
        totalPage,
        curSearchPage
    }
};
const mapDispathToProps = ({
    getSearched
});

export const SearchPage = connect(mapStateToProps,mapDispathToProps )(SearchPageComponent);
