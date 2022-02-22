import React from 'react';
import { connect } from 'react-redux';
import Cart from './Cart';
import { setAllTotalPrice, clearOrderProducts } from '../../redux/product-reducer';
import { setWantedItems, getCartProduct, setCartProduct, clearOrderCart, deleteItem, resetCartProducts } from '../../redux/cart-reducer';
import { Route, Routes } from 'react-router';
import Checkout from './checkout/Checkout';
import CartPreloader from '../common/preloaders/Cart/CartPreloader';

class CartContainer extends React.Component {
    componentDidMount() {
        this.props.resetCartProducts();

        this.props.setWantedItems();
        this.props.setAllTotalPrice();

        this.props.wantedItems.map(item => {
            this.props.getCartProduct(item);
        })

        //console.log('mounted');
    }


    componentDidUpdate(prevProps) {

        if (prevProps.wantedItems < this.props.wantedItems) {
            this.props.wantedItems.map(item => {
                this.props.getCartProduct(item);
            })

        }
        else if (prevProps.wantedItems > this.props.wantedItems) {
            this.props.resetCartProducts();

            this.props.wantedItems.map(item => {
                this.props.getCartProduct(item);
            })

        }

    }

    onItemDelete = (id) => {
        localStorage.removeItem(id, id);
        this.props.setAllTotalPrice();
        this.props.deleteItem(id);
        this.props.resetCartProducts();
    }

    render() {

        if (this.props.cartProducts.length !== this.props.wantedItems.length) {
            //console.log("cart:", this.props.cartProducts.length, "wanted:", this.props.wantedItems.length);
            return <CartPreloader />
        }

        return <>
            <Routes>
                <Route path="/" element={<Cart
                    cartProducts={this.props.cartProducts}
                    totalPrice={this.props.totalPrice}
                    onItemDelete={this.onItemDelete} 
                    CartPreloader={CartPreloader}/>} />

                <Route path="/checkout" element={<Checkout
                    totalPrice={this.props.totalPrice}
                    cartProducts={this.props.cartProducts}
                    clearOrderCart={this.props.clearOrderCart}
                    clearOrderProducts={this.props.clearOrderProducts} />} />
            </Routes>

        </>
    }
}

let mapStateToProps = (state) => ({
    wantedItems: state.cart.wantedItems,
    cartProducts: state.cart.cartProducts,
    totalPrice: state.product.totalPrice,
    city: state.user.city,
})

export default connect(mapStateToProps, { setAllTotalPrice, setWantedItems, getCartProduct, setCartProduct, clearOrderCart, clearOrderProducts, deleteItem, resetCartProducts })(CartContainer);