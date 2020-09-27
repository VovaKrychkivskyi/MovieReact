import React, {Component} from 'react';
import {HeaderDesctop} from "./headerDesctop";
import {ViewPoints} from "../../context/wrappers/DetectViewPortWrapper";
import {ViewPortContext} from "../../context/contexts";
import {HeaderMobile} from "./headerMobile";

export class Header extends Component {
    render() {
        const curViewPort = this.context;
        return (
            <div className='sticky-top'>
                {curViewPort === ViewPoints.desctop && <HeaderDesctop/>}
                {(curViewPort === ViewPoints.tablet || curViewPort === ViewPoints.phone) && <HeaderMobile/>}
            </div>
        );
    }
}
Header.contextType = ViewPortContext;