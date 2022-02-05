import { applyMiddleware, combineReducers } from 'redux';
import productReducer from './product-reducer';
import { compose } from 'redux';
import thunkMiddleware from "redux-thunk";
import cartReducer from './cart-reducer';
import userReducer from './user-reducer';

const { createStore } = require("redux");

let reducers = combineReducers({
    product: productReducer,
    cart: cartReducer,
    user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware))); 

export default store;