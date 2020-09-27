import React, {Component} from 'react';

export class Budget extends Component {
    render() {
        const {budget, label} = this.props;
        return (
            <div className='badge badge-info'>
                {label} <h5>{budget}</h5>
            </div>
        );
    }
}
