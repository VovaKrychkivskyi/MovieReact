import React, {Component} from "react";
import {DarkThemeContext, isDarkTheme} from "../contexts";


export class DarkThemeWraper extends Component {
    state = {
        ThemeStatus: isDarkTheme
    };
    toggle = ()=>{
        this.setState({
            ThemeStatus: !this.state.ThemeStatus
        })
    };
    render() {
        const {children} = this.props;
        return (
            <DarkThemeContext.Provider value={{
                isDarkTheme: this.state.ThemeStatus,
                themeToggle: this.toggle
            }}>
                {children}
            </DarkThemeContext.Provider>
        );
    }
}



