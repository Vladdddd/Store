import React from "react";
import { connect } from 'react-redux';
import Nav from './Nav';
import { setLocation } from '../../redux/user-reducer';
import { setProductName, getSearchedProducts, setCurrentSection, setCurrentPage } from '../../redux/product-reducer';

class NavContainer extends React.Component {

    componentDidMount() {
        this.props.setLocation();
    }

    onLocationChange = (location) => {
        localStorage.setItem('city', location);
        this.props.setLocation();
    }

    onSectionChanged = (section) => {
        this.props.setCurrentSection(section);
        this.props.setCurrentPage(1);
    }

    render() {
        return <>
            <Nav totalPrice={this.props.totalPrice} 
                locations={this.props.locations} 
                location={this.props.location} 
                onLocationChange={this.onLocationChange}
                searchedProductName={this.props.searchedProductName}
                setProductName={this.props.setProductName}
                getSearchedProducts={this.props.getSearchedProducts}
                onSectionChanged={this.onSectionChanged}/>
        </>
    }
}

let mapStateToProps = (state) => ({
    totalPrice: state.product.totalPrice,
    locations: state.user.locations,
    location: state.user.location,
    searchedProductName: state.product.searchedProductName,
})

export default connect(mapStateToProps, { setLocation, setProductName, getSearchedProducts, setCurrentSection, setCurrentPage })(NavContainer);