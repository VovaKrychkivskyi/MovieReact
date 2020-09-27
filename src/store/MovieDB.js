import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {rootReducer} from '../store/reducers/reducers'

export const MovieDBstore = createStore(rootReducer(), composeWithDevTools());