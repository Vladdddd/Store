import { productAPI } from "../api/api";

const SET_WANTED_ITEMS = '/cart/SET_WANTED_ITEMS';
const SET_CART_PRODUCT = '/cart/SET_CART_PRODUCT';
const CLEAR_ORDER_CART = '/cart/CLEAR_ORDER_CART';

let initialState = {
    cartProducts: [],
    wantedItems: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WANTED_ITEMS:
            let items = [];
            let i = 0;
            for (let key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue;
                }

                if( Number.isInteger( Number(localStorage.getItem(key)) ) ) {
                    items[i] = key;
                    i++;
                }                   
                
            }
            
            return {
                ...state,
                wantedItems: items
            }
        case SET_CART_PRODUCT:
            let products = [];
            if(action.product !== 'mounted') {
                products = [...state.cartProducts];
                products.push(action.product);
            }
            
            return {
                ...state,
                cartProducts: products
            }
        
        case CLEAR_ORDER_CART:
            return {
                ...state,
                cartProducts:[],
                wantedItems: []
            }

        default:
            return state;
    }

}

export const setWantedItems = () => ({type: SET_WANTED_ITEMS})
export const setCartProduct = (product) => ({type: SET_CART_PRODUCT, product})
export const clearOrderCart = () => ({type: CLEAR_ORDER_CART})

export const getCartProduct = (id) => {
    return async (dispatch) => {
        const data = await productAPI.getProduct(id);
        dispatch(setCartProduct(data.values[0]));
    }
}

export default cartReducer;