import { productAPI } from "../api/api";

const SET_WANTED_ITEMS = '/cart/SET_WANTED_ITEMS';
const SET_CART_PRODUCT = '/cart/SET_CART_PRODUCT';
const CLEAR_ORDER_CART = '/cart/CLEAR_ORDER_CART';
const DELETE_ITEM = '/cart/DELETE_ITEM';
const RESET_CART_PRODUCTS = '/cart/RESET_CART_PRODUCTS';

let initialState = {
    cartProducts: [],
    wantedItems: [],
    test: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WANTED_ITEMS:
            let initializedItems = [];
            let i = 0;
            for (let key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue;
                }

                if (Number.isInteger(Number(localStorage.getItem(key)))) {
                    initializedItems[i] = key;
                    i++;
                }

            }

            return {
                ...state,
                wantedItems: initializedItems
            }

        case DELETE_ITEM:
            let newItems = [...state.wantedItems];
            let newCartProducts = [];

            for (let prodId = 0; prodId < state.cartProducts.length; prodId++) {
                newCartProducts[prodId] = { ...state.cartProducts[prodId] };
            }


            let index = newItems.indexOf(String(action.id));
            newItems.splice(index, 1);

            return {
                ...state,
                wantedItems: newItems,
            }

        case SET_CART_PRODUCT:
            let products = [];

            products = [...state.cartProducts];
            products.push(action.product);



            return {
                ...state,
                cartProducts: products
            }

        case CLEAR_ORDER_CART:
            return {
                ...state,
                cartProducts: [],
                wantedItems: []
            }

        case RESET_CART_PRODUCTS:
            return {
                ...state,
                cartProducts: []
            }

        default:
            return state;
    }

}

export const setWantedItems = () => ({ type: SET_WANTED_ITEMS })
export const setCartProduct = (product) => ({ type: SET_CART_PRODUCT, product })
export const clearOrderCart = () => ({ type: CLEAR_ORDER_CART })
export const deleteItem = (id) => ({ type: DELETE_ITEM, id })
export const resetCartProducts = () => ({ type: RESET_CART_PRODUCTS })

export const getCartProduct = (id) => {
    return async (dispatch) => {
        const data = await productAPI.getProduct(id);
        dispatch(setCartProduct(data.values[0]));
    }
}

export default cartReducer;