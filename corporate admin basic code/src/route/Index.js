import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";

import UserProfileLayout from "../pages/pre-built/user-manage/UserProfileLayout";
import OrderDefault from "../pages/pre-built/orders/OrderDefault";
import OrderRegular from "../pages/pre-built/orders/OrderRegular";

import ProductList from "../pages/pre-built/products/ProductList";

import InvoiceList from "../pages/pre-built/invoice/InvoiceList";

import PrivateRoute from "./PrivateRoute";
import Interest from "../pages/interest/interest";
import ProductCategory from "../pages/pre-built/products/category/ProductCategory";
import ProductSubCategory from "../pages/pre-built/products/subCategory/ProductSubCategory";
import Rating from "../pages/pre-built/rating/rating";
import Notification from "../pages/pre-built/notification/notification";
import MysteryBoxByDate from "../pages/mysteryBox/MysteryBoxByDate";
import PaymentDetails from "../pages/pre-built/invoice/PaymentDetails";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/*Panel */}

        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-setting/`} component={UserProfileLayout}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/order-list-individual`} component={OrderDefault}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-list-mystery-box`} component={OrderRegular}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/mystery-box-details/:date`} component={MysteryBoxByDate}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/payment-details/:date`} component={PaymentDetails}></Route>



        <Route exact path={`${process.env.PUBLIC_URL}/product-list`} component={ProductList}></Route>


        <Route exact path={`${process.env.PUBLIC_URL}/payment-list`} component={InvoiceList}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/rating-list`} component={Rating}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/notifications`} component={Notification}></Route>


        {/*User Pages*/}
        <PrivateRoute exact path={`${process.env.PUBLIC_URL}/mystery-box`} component={Interest}></PrivateRoute>

        {/*Product Pages*/}
        <PrivateRoute exact path={`${process.env.PUBLIC_URL}/product-category`} component={ProductCategory}></PrivateRoute>
        <PrivateRoute exact path={`${process.env.PUBLIC_URL}/product-sub-category`} component={ProductSubCategory}></PrivateRoute>

        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
