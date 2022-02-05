import React from "react";
import { connect } from 'react-redux';
import Categories from './Categories';
import { setCurrentSection, setCurrentPage } from '../../redux/product-reducer';

class CategoriesContainer extends React.Component {

    onSectionChanged = (city) => {
        this.props.setCurrentSection(city);
        this.props.setCurrentPage(1);
    }

    render() {
        return <>
            <Categories productSections={this.props.productSections} onSectionChanged={this.onSectionChanged} currentSection={this.props.currentSection}/>
        </>
    }
}

let mapStateToProps = (state) => ({
    productSections: state.product.productSections,
    currentSection: state.product.currentSection
})

export default connect(mapStateToProps, { setCurrentSection, setCurrentPage })(CategoriesContainer);