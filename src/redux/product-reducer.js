import { productAPI } from "../api/api";
import { storageChecker } from "../components/utils/storageChecker/storageChecker";

const SET_PRODUCT = '/product/SET_PRODUCT';
const SET_CURRENT_PAGE = '/product/SET_CURRENT_PAGE';

const SET_ADDED_ITEMS = '/product/SET_ADDED_ITEMS';
const SET_ADDED_ITEM = '/product/SET_ADDED_ITEM';

const SET_TOTAL_PRICE = '/product/SET_TOTAL_PRICE';
const SET_ALL_TOTAL_PRICE = '/products/SET_ALL_TOTAL_PRICE';
const CLEAR_ORDER_PRODUCTS = '/products/CLEAR_ORDER_PRODUCTS';
const SET_CURRENT_SECTION = '/products/SET_CURRENT_SECTION';
const SET_TOTAL_PRODUCTS_COUNT = '/products/SET_TOTAL_PRODUCTS_COUNT';
const SET_PRODUCT_NAME = '/products/SET_PRODUCT_NAME';

let initialState = {
    productSections: ['All Products', 'For You'],
    currentSection: 'All Products',
    products: [],
    currentPage: 1,
    pageSize: 4,
    totalProductsCount: 0,
    addedItems: [],
    totalPrice: 0,
    searchedProductName: ""
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                products: action.products
            }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        
        case SET_ADDED_ITEMS:
            const addedItems = action.products.map(item => {
                return storageChecker(item.id);
            });

            return {
                ...state,
                addedItems: addedItems
            }

        case SET_ADDED_ITEM:
            let newAddedItems = { ...state.addedItems };
            let itemId = 0;
            if (action.currentPage === 1) {
                itemId = action.id - 1;

            } else {
                itemId = action.id - ((action.currentPage - 1) * 4 + 1);
            }
            newAddedItems[itemId] = action.value;

            return {
                ...state,
                addedItems: newAddedItems
            }
        
        case SET_TOTAL_PRICE:
            let newTotalPrice = state.totalPrice;
            if (action.value) {
                newTotalPrice += action.price;
            } else {
                newTotalPrice -= action.price;
            }

            return {
                ...state,
                totalPrice: newTotalPrice
            }

        case SET_ALL_TOTAL_PRICE:
            let allTotalPrice = 0;
            for (let key in localStorage) {
                if (!localStorage.hasOwnProperty(key)) {
                    continue;
                }

                if( Number.isInteger( Number(localStorage.getItem(key)) ) ) {
                    allTotalPrice += Number(localStorage.getItem(key));
                }   
            }

            return {
                ...state,
                totalPrice: allTotalPrice
            }
        
        case CLEAR_ORDER_PRODUCTS:
            localStorage.clear();
            return {
                ...state, 
                totalPrice: 0,
                addedItems: [],
            } 

        case SET_CURRENT_SECTION:
            return {
                ...state,
                currentSection: action.section
            }

        case SET_TOTAL_PRODUCTS_COUNT:
            return {
                ...state,
                totalProductsCount: action.count
            }

        case SET_PRODUCT_NAME: 
            return {
                ...state,
                searchedProductName: action.name
            }    

        default:
            return state;
    }

}

export const setProducts = (products) => ({ type: SET_PRODUCT, products })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

export const setAddedItems = (products) => ({ type: SET_ADDED_ITEMS, products })
export const setAddedItem = (id, value, currentPage) => ({ type: SET_ADDED_ITEM, id, value, currentPage })

export const setTotalPrice = (value, price) => ({ type: SET_TOTAL_PRICE, value, price })
export const setAllTotalPrice = () => ({ type: SET_ALL_TOTAL_PRICE })
export const clearOrderProducts = () => ({type: CLEAR_ORDER_PRODUCTS})
export const setCurrentSection = (section) => ({type: SET_CURRENT_SECTION, section})
export const setTotalProductsCount = (count) => ({type: SET_TOTAL_PRODUCTS_COUNT, count})

export const setProductName = (name) => ({type: SET_PRODUCT_NAME, name})

export const getProducts = (page, pageSize, city) => {
    return async (dispatch) => {
        dispatch(setCurrentPage(page));
        const data = await productAPI.getProducts(page, pageSize, city);

        dispatch(setProducts(data.values));
        dispatch(setAddedItems(data.values));
        dispatch(setAllTotalPrice());
    }
}

export const getProductsCount = (city) => {
    return async (dispatch) => {
        const data = await productAPI.getProductsCount(city);
        
        dispatch(setTotalProductsCount(data.values[0]['COUNT(1)']));
    }
}

export const getSearchedProducts = (name) => {
    return async (dispatch) => {
        const data = await productAPI.getSearchedProducts(name);

        dispatch(setProducts(data.values));
        dispatch(setAllTotalPrice());
        dispatch(setProductName(""));
    }
} 

export default productReducer;