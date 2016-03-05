import { createStore } from 'redux';
import cuteApp from './reducers';
import { likeItem } from './actions'

let store = createStore(cuteApp)

export default store
