import { createStore } from 'redux';
import cuteApp from './reducers';

let store = createStore(cuteApp)

export default store
