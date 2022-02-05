import React from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';
import { setAllTotalPrice, clearOrderProducts } from '../../redux/product-reducer';
import { setWantedItems, getCartProduct, setCartProduct, clearOrderCart } from '../../redux/cart-reducer';
import { Route, Routes } from 'react-router';
import Checkout from './checkout/Checkout';

class CartContainer extends React.Component {
    componentDidMount() {  
        this.props.setCartProduct('mounted');   
        this.props.setWantedItems();
        this.props.setAllTotalPrice();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.wantedItems !== this.props.wantedItems) {
            this.props.wantedItems.map(item => {
                this.props.getCartProduct(item);
            });
        }
    }

    render() {
        if(this.props.cartProducts.length !== this.props.wantedItems.length) {
            return <div>loading...</div>
        }
        return <>
            <Routes>
                <Route path="/" element={<Cart cartProducts={this.props.cartProducts} totalPrice={this.props.totalPrice}/>}/>
                <Route path="/checkout" element={<Checkout totalPrice={this.props.totalPrice} 
                    cartProducts={this.props.cartProducts} clearOrderCart={this.props.clearOrderCart} 
                    clearOrderProducts={this.props.clearOrderProducts}/>} />
            </Routes>
            
        </>
    }
}

let mapStateToProps = (state) => ({
    wantedItems: state.cart.wantedItems,
    cartProducts: state.cart.cartProducts,
    totalPrice: state.product.totalPrice,
    city: state.user.city
})

export default connect(mapStateToProps, { setAllTotalPrice, setWantedItems, getCartProduct, setCartProduct, clearOrderCart, clearOrderProducts })(CartContainer);