import React, {Component} from "react";
import './styleSpinners.css'
import {DarkThemeContext} from "../../context/contexts";

export class SpinnerBLosks extends Component {
    static contextType = DarkThemeContext;
    render() {
        const darkTheme = this.context;
        return (
                <div className="sk-cube-grid">
                    <div className={`sk-cube sk-cube1 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube2 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube3 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube4 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube5 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube6 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube7 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube8 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                    <div className={`sk-cube sk-cube9 ${darkTheme.isDarkTheme? 'DarkThemeSpinner':'BrightThemeSpinner'}`}></div>
                </div>
        );
    }
}