import React from "react";
import CartPreloader from "./Cart/CartPreloader";
import ProductsPreloader from "./Products/ProductsPreloader";

const Preloader = ({ pathname }) => {
    if(pathname === '/') {
        return <ProductsPreloader />
    }
    else if(pathname === '/cart') {
        return <CartPreloader />
    }

    return <div></div>;
}

export default Preloader;