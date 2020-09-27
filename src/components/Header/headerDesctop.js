import React, {Component} from 'react';

import {LogoHeader} from "../logo/logo";
import {Search} from "../search/Search";
import {UserInfo} from "../UserInfo/userInfo";
import {NavBar} from "../NavBar/NavBar";
import {DarkThemeContext} from "../../context/contexts";
import {SwitchToggler} from "../switchToggler/switchToggler";

import './headerStyle.css'

export class HeaderDesctop extends Component {
    state = {
        scrolled: false
    };
    componentDidMount() {
        document.addEventListener('scroll',this.HeaderStyler)
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.HeaderStyler)
    }
    HeaderStyler = (event)=>{
        if (window.scrollY > 0) {
            this.setState({
                scrolled: true
            });
        } else {
            this.setState({
                scrolled: false
            })
        }
    };
    render() {
        const {scrolled} = this.state;
        return (
            <DarkThemeContext.Consumer>
                {
                    (value)=>{
                        const {isDarkTheme, themeToggle} = value;
                        return (<div className={`container- justify-content-around d-flex header ${scrolled? 'headerScroled' : ''} ${isDarkTheme? "bg-dark text-white": " bg-white text-dark" }`}>
                            <LogoHeader flag={scrolled}/>
                            <NavBar flag={true}/>
                            <Search/>
                            <SwitchToggler flag={isDarkTheme} func={themeToggle} label='toggle theme'/>
                            <UserInfo flag={scrolled}/>
                        </div>)
                    }
                }
            </DarkThemeContext.Consumer>
        );
    }
}
