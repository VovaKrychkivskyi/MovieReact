import React, {Component} from 'react';
import {withRouter} from "react-router";
import './FooterStyle.scss'

class FooterNavigatorComponent extends Component {
    onBack = ()=>{
        const {history} =  this.props;
        history.go(-1)
    };

    render() {
        const DarkTheme = this.context;
        return (
         <div className="bg-info w-100 p-0 m-0 footerNav">
             <button onClick={this.onBack} className='btn btn-dark m-3'>back</button>
         </div>
        );
    }
}

export const FooterNavigator = withRouter(FooterNavigatorComponent);
