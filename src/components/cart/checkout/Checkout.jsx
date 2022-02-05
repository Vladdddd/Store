import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import s from './checkout.module.scss';
import OrderList from './OrderList';
import { orderAPI } from '../../../api/api';

const Checkout = ({totalPrice, cartProducts, clearOrderCart, clearOrderProducts}) => {
    const [isSent, setIsSent] = React.useState(false);

    
    const validationsSchema = yup.object().shape({
        name: yup.string().typeError('Should be a string').required('necessarily'),//typeError не сработает, но если бы тип был number, typeError сработал
        secondName: yup.string().typeError('Should be a string').required('necessarily'),
        city: yup.string().typeError('Should be a string').required('necessarily'),
        address: yup.string().typeError('Should be a string').required('necessarily'),
        phone: yup.string().typeError('Should be a string').required('necessarily'),
        email: yup.string().email('Enter correct email').required('necessarily'),
    })

    const requestOrderProducts = (values) => {
        const order = {...values, totalPrice};
        order.cartProducts = '';
        order.totalPrice = totalPrice;

        for(let i = 0; i < cartProducts.length-1; i++) {
            if(i < 6) {order.cartProducts += String(cartProducts[i].id) + ',';}   
            else {order.cartProducts += String(cartProducts[i].id);}
        }
        orderAPI.postOrder(order); 
        setIsSent(true);
        clearOrderCart();
        clearOrderProducts();       
    }

    if(isSent) {
        return <div>Your order successfully sent</div>
    }

    return (
        <div className={s.checkoutWrapper}>
            <Formik
                initialValues={{
                    name: '',
                    secondName: '',
                    city: '',
                    address: '',
                    phone: '',
                    email: ''
                }}
                validateOnBlur
                onSubmit={(values) => { requestOrderProducts(values) }}
                validationSchema={validationsSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <div className={s.checkout}>
                        <h1 className={s.caption}>Order details</h1>
                        
                        <div className={s.names}>
                            <div className={s.name}>
                                <p>
                                    <label htmlFor={'name'}>Name</label><br />
                                    <input
                                        type={'text'}
                                        name={'name'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}

                                    />
                                </p>
                                {touched.name && errors.name && <p className={s.error}>{errors.name}</p>}
                            </div>

                            <div>
                                <p>
                                    <label htmlFor={'secondName'}>Second name</label><br />
                                    <input
                                        type={'text'}
                                        name={'secondName'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.secondName}

                                    />
                                </p>
                                {touched.secondName && errors.secondName && <p className={s.error}>{errors.secondName}</p>}
                            </div>

                        </div>

                        <div>
                                <p>
                                    <label htmlFor={'city'}>City</label><br />
                                    <input
                                        type={'text'}
                                        name={'city'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.city}
                                    />
                                </p>
                                {touched.city && errors.city && <p className={s.error}>{errors.city}</p>}
                        </div>

                        <div>
                                <p>
                                    <label htmlFor={'address'}>Address</label><br />
                                    <input
                                        type={'text'}
                                        name={'address'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}

                                    />
                                </p>
                                {touched.address && errors.address && <p className={s.error}>{errors.address}</p>}
                        </div>

                        <div>
                                <p>
                                    <label htmlFor={'phone'}>Phone</label><br />
                                    <input
                                        type={'text'}
                                        name={'phone'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}

                                    />
                                </p>
                                {touched.phone && errors.phone && <p className={s.error}>{errors.phone}</p>}
                        </div>

                        <div>
                                <p>
                                    <label htmlFor={'email'}>Email</label><br />
                                    <input
                                        type={'text'}
                                        name={'email'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}

                                    />
                                </p>
                                {touched.email && errors.email && <p className={s.error}>{errors.email}</p>}
                        </div>

                        <button
                            className={s.acceptButton}
                            disabled={!isValid && !dirty}
                            onClick={handleSubmit}
                            type={'submit'}
                        >Place order</button>
                    </div>
                )}
            </Formik>
            <OrderList className={s.orderList} totalPrice={totalPrice} cartProducts={cartProducts}/>
        </div>
    );
}

export default Checkout;