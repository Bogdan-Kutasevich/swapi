import {combineReducers, createStore} from "redux";
import categoriesReducer from "./categoriesReducer";


let reducers = combineReducers({
    Categories: categoriesReducer,
} );

let store = createStore(reducers);

export default store