import * as axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3500/`,
})

export const productAPI = {
    getProducts(page = 1, pageSize = 4, city="all") {
        return instance.get(`products?page=${page}&count=${pageSize}&city=${city}`)
        .then (response => {
            return response.data;
        });
    },
    getProduct(id) {
        return instance.get(`product?id=${id}`)
        .then (response => {
            return response.data;
        });
    },
    getProductsCount(city="all") {
        return instance.get(`products/count?city=${city}`)
        .then (response => {
            return response.data;
        });
    },
    getSearchedProducts(name) {
        return instance.get(`products/search?name=${name}`)
        .then (response => {
            return response.data;
        });
    }
}

export const orderAPI = {
    postOrder(order) {
        return instance.post(`orders/add`, order)
        .then (response =>{
            return response.data; 
        });
    }
}