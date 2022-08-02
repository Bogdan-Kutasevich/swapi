import {combineReducers, createStore} from "redux";
import dialogsReducer from "./dialogsReducer";
import wallReducer from "./WallReducer";
import friendsReducer from "./friendsReducer";

let reducers = combineReducers({
    dialogsPage: dialogsReducer,
    wallPage: wallReducer,
    friendsPage: friendsReducer
} );

let store = createStore(reducers);



export default store