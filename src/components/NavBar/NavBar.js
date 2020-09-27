import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {clearOnHome} from "../../store/actions";
import {DarkThemeContext} from "../../context/contexts";

import './NavBarStyle.css'


export class NavBarComponent extends Component {
    state = {
        isNEW: true
    };
    CleareHomePage = ()=>{
        const {func} = this.props;
        const {clearOnHome} = this.props;
        clearOnHome();
        func && func()
    };
    Watched = ()=>{
        const {func} = this.props;
        this.setState({
            isNEW: false
        });
        func && setTimeout(()=>{func();},200)
    };
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.favorites.length > prevProps.favorites.length){
            this.setState({
                isNEW: true
            })
        }else return
    }
    static contextType = DarkThemeContext;
    render() {
        const {func} = this.props;
        const darkTheme = this.context;
        const {favorites, flag} = this.props;
        const {isNEW} = this.state;
        return (
               <div className={`nawBar ${flag && "direction"}`}>
                   <div>
                       <NavLink onClick={this.CleareHomePage} className={`${darkTheme.isDarkTheme ? " text-white" : " text-dark"}`} to='/page/1'> <h4>Home</h4></NavLink>
                   </div>
                   <div className='direction'>
                       <NavLink className={`${darkTheme.isDarkTheme ? " text-white" : " text-dark"}`} onClick={this.Watched} to='/favorites'> <h4>Favorites</h4></NavLink>
                       {isNEW && favorites.length > 0 && <div className='badge badge-warning'><h6>new</h6></div>}
                   </div>
               </div>
        );
    }
}
const mapStateToProps =(store)=>{
    const {mainReducer: {favorites}} = store;
    return {
        favorites
    }
};

 const mapDispatchToProps = ({
    clearOnHome
});
export const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);