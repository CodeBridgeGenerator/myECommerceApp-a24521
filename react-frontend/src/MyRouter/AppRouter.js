import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleCustomerPage from "../components/app_components/CustomerPage/SingleCustomerPage";
import CustomerProjectLayoutPage from "../components/app_components/CustomerPage/CustomerProjectLayoutPage";
import SingleBillingPage from "../components/app_components/BillingPage/SingleBillingPage";
import BillingProjectLayoutPage from "../components/app_components/BillingPage/BillingProjectLayoutPage";
import SingleCartPage from "../components/app_components/CartPage/SingleCartPage";
import CartProjectLayoutPage from "../components/app_components/CartPage/CartProjectLayoutPage";
import SingleProductPage from "../components/app_components/ProductPage/SingleProductPage";
import ProductProjectLayoutPage from "../components/app_components/ProductPage/ProductProjectLayoutPage";
import SingleOrderPage from "../components/app_components/OrderPage/SingleOrderPage";
import OrderProjectLayoutPage from "../components/app_components/OrderPage/OrderProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/customer/:singleCustomerId" exact element={<SingleCustomerPage />} />
<Route path="/customer" exact element={<CustomerProjectLayoutPage />} />
<Route path="/billing/:singleBillingId" exact element={<SingleBillingPage />} />
<Route path="/billing" exact element={<BillingProjectLayoutPage />} />
<Route path="/cart/:singleCartId" exact element={<SingleCartPage />} />
<Route path="/cart" exact element={<CartProjectLayoutPage />} />
<Route path="/product/:singleProductId" exact element={<SingleProductPage />} />
<Route path="/product" exact element={<ProductProjectLayoutPage />} />
<Route path="/order/:singleOrderId" exact element={<SingleOrderPage />} />
<Route path="/order" exact element={<OrderProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
