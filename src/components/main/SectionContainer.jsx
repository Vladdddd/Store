import React from "react";
import { connect } from 'react-redux';
import Section from './Section';
import { getProducts, setAddedItem, setTotalPrice, getProductsCount, setCurrentSection, getSearchedProducts, setAllTotalPrice } from '../../redux/product-reducer';
import CategoriesContainer from '../categories/CategoriesContainer';
import { setLocation } from '../../redux/user-reducer';
import { storageChecker } from '../utils/storageChecker/storageChecker';
import { Route, Routes } from "react-router";
import Products from "./products/Products";

class SectionContainer extends React.Component {

    componentDidMount() {
        this.props.setLocation();
        
    }

    onPageChanged = (pageNumber) => {
        let { pageSize } = this.props;
        this.props.getProducts(pageNumber, pageSize);
    }

    onAddInCart = (id, value, price, currentPage) => {
        if (value) {
            localStorage.setItem(id, price);
            this.props.setAddedItem(id, value, currentPage);
            this.props.setTotalPrice(value, price);
        } else {
            localStorage.removeItem(id, id);
            this.props.setAddedItem(id, value, currentPage);
            this.props.setTotalPrice(value, price);
        }
    }

    getProducts = () => {
        let { currentPage, pageSize } = this.props;
        this.props.getProducts(currentPage, pageSize);
        this.props.getProductsCount();
    }

    getUserProducts = () => {
        let { currentPage, pageSize, location } = this.props;
        this.props.getProducts(currentPage, pageSize, location);
        this.props.getProductsCount(location);
    }

    getSearchedProducts = () => {
        if(this.props.searchedProductName) {
            this.props.getSearchedProducts(this.props.searchedProductName);
        }

        this.props.getProductsCount(this.props.location);
        this.props.setAllTotalPrice();
    }


    render() {
        return <>
            <Routes>
                <Route path="/*" element={<>
                    <CategoriesContainer />
                    <Section products={this.props.products}
                        onPageChanged={this.onPageChanged}
                        currentPage={this.props.currentPage}
                        totalProductsCount={this.props.totalProductsCount}
                        pageSize={this.props.pageSize}
                        onAddInCart={this.onAddInCart}
                        storageChecker={storageChecker}
                        addedItems={this.props.addedItems}
                        currentSection={this.props.currentSection}
                        setCurrentSection={this.props.setCurrentSection}
                        
                        getProducts={this.getProducts}
                        getUserProducts={this.getUserProducts}
                        location={this.props.location}
                    />
                </>} />
                <Route path="/searched" element={<Products
                    products={this.props.products}
                    getProducts={this.getSearchedProducts}
                    
                    currentSection={"Searched Products"}
                    setCurrentSection={this.props.setCurrentSection}

                    onPageChanged={this.onPageChanged}
                    currentPage={this.props.currentPage}
                    totalProductsCount={this.props.totalProductsCount}
                    pageSize={this.props.pageSize}
                    onAddInCart={this.onAddInCart}
                    storageChecker={storageChecker}
                    addedItems={this.props.addedItems} 

                    location={this.props.location}
                    />} />
            </Routes>


        </>
    }
}

let mapStateToProps = (state) => ({
    products: state.product.products,
    currentPage: state.product.currentPage,
    totalProductsCount: state.product.totalProductsCount,
    pageSize: state.product.pageSize,
    addedItems: state.product.addedItems,
    location: state.user.location,
    currentSection: state.product.currentSection,
    searchedProductName: state.product.searchedProductName
})

export default connect(
    mapStateToProps, 
    { getProducts, setAddedItem, setTotalPrice, getProductsCount, setLocation, setCurrentSection, getSearchedProducts, setAllTotalPrice }
)(SectionContainer);