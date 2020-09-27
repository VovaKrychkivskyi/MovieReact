import React, {Component} from "react";
import StarRatings from 'react-star-ratings';


export class StartRating extends Component {
    state = {
        reting: null    
    };
    componentDidMount() {
        const {rating} = this.props;
            let res = rating/2;
            this.setState({
                rating: res
            })

    }
    render() {
        const {rating} =this.state;

        return (
            <StarRatings
                rating={rating}
                starDimension="20px"
                starSpacing="5px"
                starRatedColor={'rgb(242,255,0)'}
            />
        );
    }
}

