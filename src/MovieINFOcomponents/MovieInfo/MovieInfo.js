import React, {Component} from 'react';
import './MovieInfo.css'

export class MovieInfo extends Component {
    render() {
        const {movie, flag} = this.props;
        const {title, adult, overview} = movie;
        return (
            <div className='card-body'>
                <h4 className="card-title">{title}</h4>
                {adult
                    ? <span className="badge badge-danger">Adult</span>
                    : <span className="badge badge-success">PG</span>}
                <p className={`card-text ${!flag && ' block'}`}>
                    {overview}
                </p>
            </div>
        );
    }
}