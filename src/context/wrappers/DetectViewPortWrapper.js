import React, {Component} from 'react';
import {ViewPortContext} from "../contexts";

export const ViewPoints = {
    desctop: 'desctop',
    tablet: 'tablet',
    phone: 'phone'
};
const DESCTOP_WIDTH = 1200;
const TABLET_WIDTH = 768;
const PHONE_WIDTH = 576;


export class DetectViewPortWrapper extends Component {
    state = {
        curViewPoint: ViewPoints.desctop
    };
    componentDidMount() {
        window.addEventListener('resize', this.HandleSize);
        this.HandleSize();
    }
    componentWillUnmount() {
        window.addEventListener('resize', this.HandleSize)
    }
    HandleSize = ()=>{
        let width = window.innerWidth;
        let viewPort = ViewPoints.desctop;
        width >= DESCTOP_WIDTH
            ? viewPort = ViewPoints.desctop
            : width < DESCTOP_WIDTH && width >= TABLET_WIDTH
                ? viewPort = ViewPoints.tablet
                : width < TABLET_WIDTH && width >= PHONE_WIDTH
                    ? viewPort = ViewPoints.phone
                    : viewPort = ViewPoints.phone;
                this.setState({
                    curViewPoint: viewPort
        })
    };

    render() {
        const {curViewPoint} = this.state;
        const {children} = this.props;
        return (
            <ViewPortContext.Provider value={curViewPoint}>
                {children}
            </ViewPortContext.Provider>
        );
    }
}

