import React, {Component} from 'react';
import {key} from "../../constants";
import {withRouter} from 'react-router'
import './searchStyle.css'
import {DarkThemeContext} from "../../context/contexts";

class SearchComponent extends Component {
    state = {
        keyWord: '',
        searched: [],
        searching: false,
        isOpen: true
    };
    handler = (ev)=>{
        this.setState({
            keyWord: ev.target.value,
            isOpen: true
        })
    };
    static contextType = DarkThemeContext;
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevState.keyWord,this.state.keyWord );
        if (prevState.keyWord === this.state.keyWord || this.state.keyWord === '') return;
        this.fetchSearch(this.state.keyWord);
        // console.log(this.state.searched);
    }
    fetchSearch = async (word)=>{
        this.setState({
            searching: true
        });
        let arr = await fetch(`https://api.themoviedb.org/3/search/keyword?query=${word}&api_key=${key}`);
        let json = await arr.json();
        if (json.status) return ;
        json.results.length = 10;
        this.setState({
            searched: json.results,
            searching: false
        })
    };
    onSearch = ()=>{
        const {func} = this.props;
        const {keyWord} = this.state;
        if (keyWord === '') return;
        this.setState({
            isOpen: false
        });
    const {history} = this.props;
    history.push(`/search/1?keyword=${keyWord}`);
        this.setState({
            keyWord: '',
        })
        func && func()
    };
    onChoose = (str)=>{
        return ()=>{
            this.setState({
                keyWord: str
            })
        }
    };
 componentDidMount() {
document.addEventListener('click', this.onClose);
 }
 componentWillUnmount() {
document.removeEventListener('click', this.onClose)
 }
 searchDropRef = React.createRef();
 inputRef = React.createRef();

 onClose = (event)=> {
     if (this.searchDropRef.current === null) return;
     if (this.searchDropRef && !this.searchDropRef.current.contains(event.target)){
         this.setState({
             isOpen: false
         })
     }
     if (this.inputRef && this.inputRef.current.contains(event.target)) {
         this.setState({
             isOpen: true
         })
     }
 };
handlerKey = (event)=>{
        if(event.key === 'Enter'){
            event.preventDefault();
      this.onSearch()
        }
};
    render() {
        const darkTheme = this.context;
        const {searching,searched, keyWord, isOpen} = this.state;

        return (
            <nav className="navbar navbar-light" >
                <form className="form-inline position-relative" >
                    <input className="form-control mr-sm-2"
                           type="text"
                           value={keyWord}
                           size="15"
                           onChange={this.handler}
                           ref={this.inputRef}
                            onKeyPress={this.handlerKey}
                    />
                    <div>
                        {!searching && <ul className="list-group fixed" ref={this.searchDropRef}>
                            {isOpen &&!!keyWord &&!!searched && searched.map(value =>  <li key={value.id}
                                                                                  className={`list-group-item ${!darkTheme.isDarkTheme? "bg-dark text-white": "bg-white text-dark"}`}
                                                                                  onClick={this.onChoose(value.name)}
                            >
                                {value.name}
                            </li>)}
                        </ul>}
                    </div>
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.onSearch} type="button">Search</button>
                </form>
            </nav>
        );
    }
}

// export const Search = connect()(SearchComponent);
export const Search = withRouter(SearchComponent);