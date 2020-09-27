import React, {Component} from 'react';

export class ImdBhref extends Component {

    render() {
       const {href} = this.props;
        return (
            <div onClick={this.goToIMDB}>
                <span className="badge badge-warning">
                    <h4>
                       <a className='text-white' target="_blank"  href={`https://www.imdb.com/title/${href}`}>IMDB</a>
                    </h4>

                </span>

            </div>
        );
    }
}

