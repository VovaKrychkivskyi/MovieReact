import React, {Component} from 'react';
import {key} from "../../constants";

export class PosterPreview extends Component {
    render() {
        const {posterPath} = this.props;
        return (
                <img src={`https://image.tmdb.org/t/p/w300${posterPath}?api_key=${key}`} alt="poster"/>
        );
    }
}
