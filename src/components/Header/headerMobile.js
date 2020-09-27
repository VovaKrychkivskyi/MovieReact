import React, {Component} from 'react';
import './headerStyle.css'
import './MobileHeaderStyle.scss'

import {LogoHeader} from "../logo/logo";
import {Search} from "../search/Search";
import {DarkThemeContext} from "../../context/contexts";
import Close from '../../assets/close.png'
import MenuIcon from '../../assets/menu-icon.png'
import {NavBar} from "../NavBar/NavBar";
import {SwitchToggler} from "../switchToggler/switchToggler";
import {UserInfo} from "../UserInfo/userInfo";
import {Collapse} from '../../components/MoviesList/collapse'

export class HeaderMobile extends Component {
    state = {
        isOpen: false,
        isClosed: true,
        isGenreBarOpen: false
    };
    toggle = ()=>{
        this.setState({
            isOpen: true,
            isClosed: !this.state.isClosed,
            isGenreBarOpen: false
        })
    };
    toogleGenres = ()=>{
        this.setState({
            isGenreBarOpen: !this.state.isGenreBarOpen
        })
    };
    toogleSideBar = ()=>{
        this.setState({
            isOpen: false,
            isClosed: true,
            isGenreBarOpen: false
        })
    };
    render() {
        const {isClosed,isOpen, isGenreBarOpen} = this.state;
       const {isDarkTheme, themeToggle} = this.context;
        return (
       <div className={`d-flex justify-content-between align-items-center  header headerScroled ${isDarkTheme && 'bg-dark text-white'}`}>
               <img onClick={this.toggle} className='iconMenu m-2' src={MenuIcon} alt="menu"/>
           <LogoHeader flag={true}/>
           {isOpen &&
           <div className={`panel${isClosed? ' none':''} ${isDarkTheme && 'bg-dark text-white'} flex-column align-items-start`}>
               <div className='head'>
                   <SwitchToggler flag={isDarkTheme} func={themeToggle} label='toggle theme'/>
                   <div className='close-btn' onClick={this.toggle}> <img src={Close} alt="close" /></div>
               </div>
               {!isGenreBarOpen && [
                   <UserInfo flag={true}/>,
                   <Search func={this.toogleSideBar}/>,
                   <NavBar func={this.toogleSideBar}/>
               ]}
                <div className="genresMenu">
                    <h4 onClick={this.toogleGenres}>{isGenreBarOpen? " < back": "Genres"}</h4>
                </div>
               {isGenreBarOpen &&
               <Collapse flag={true} func={this.toogleSideBar}/>
               }

           </div>
           }
       </div>
        );
    }
}
HeaderMobile.contextType = DarkThemeContext;
