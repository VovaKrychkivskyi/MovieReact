import React, {Component} from 'react';
import {ListGroupItem} from 'reactstrap';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {DarkThemeContext} from "../../context/contexts";

import './movieListStyle.css'


class CollapseComponent extends Component {
    static contextType = DarkThemeContext;
  render() {
      const darkTheme = this.context;
      const {genres, curGenre, flag, func} = this.props;
      if (!genres) return ;
     debugger
      return (
          <div className={flag? 'p-3 d-flex flex-wrap': 'groupList'}>
              {genres.map(value =>
                  <ListGroupItem  key={value.id} className={` ${flag && 'w-50'} ${darkTheme.isDarkTheme? "DarkTheme": "BrigtTheme"} ${+curGenre === value.id? 'bg-primary': ''}`}>
                  <NavLink onClick={func}  to={`/page/1?genre=${value.id}`}><span className={darkTheme.isDarkTheme? 'text-white': +curGenre === value.id? 'text-white': 'text-primary' }>{value.name}</span></NavLink>
                  </ListGroupItem>
              )}
          </div>
      )
  }
}

const masStateToProps = (store)=>{
    const {mainReducer: {curGenre, genres}} = store
    return{
        curGenre,
        genres
    }
};
export const Collapse = connect(masStateToProps)(CollapseComponent);


