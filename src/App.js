import React, { Suspense, lazy } from 'react';
import s from './app.module.scss';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import NavContainer from './components/nav/NavContainer';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Preloader from './components/common/preloaders/Preloader';

const SectionContainer = lazy(() => import('./components/main/SectionContainer'));
const CartContainer = lazy(() => import('./components/cart/CartContainer'));

function App() {
    const { pathname } = useLocation();

    return (
        <div className={s.app}>
            <NavContainer />
            <Suspense fallback={<Preloader pathname={pathname} />}>
                <Routes>
                    <Route path="/*" element={<SectionContainer/>} />
                    <Route path="/cart/*" element={<CartContainer/>} />
                </Routes>
            </Suspense>
        </div>
    );
}

const AppContainer = (props) => {
    return <Provider store={store}>
        <App />
    </Provider>
}

export default AppContainer;
