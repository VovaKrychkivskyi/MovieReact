import React, {Component} from 'react';
import {User} from "../../constants";

import './UserInfoStyle.css'

export class UserInfo extends Component {
    render() {
        const {flag} = this.props;
        const {avatar, username} = User;
        return (
            <div className='UserInfo'>
                <img className={`rounded-circle ${flag? 'userAvatarScroled' : "userAvatar"}`} src={avatar} alt="Circle image"/>
                <h5 className='userNameStyle'>{username}</h5>
            </div>
        );
    }
}

