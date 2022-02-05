import { productAPI } from "../api/api";

const SET_LOCATION = '/user/SET_LOCATION';

let initialState = {
    locations: ['Kyiv', 'Poltava', 'Odesa', 'Dnipro'],
    location: 'Kyiv',
    
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:
            const location = localStorage.getItem('city');
            return {
                ...state,
                location: location
            }

        default:
            return state;
    }

}

export const setLocation = () => ({type: SET_LOCATION})

export default userReducer;