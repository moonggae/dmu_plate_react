import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";

// pages for this product
import Components from "views/Components/Components.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import Home from "views/Home/Home.js";
import StoreRegistration from "views/StoreRegistration/StoreRegistration";
import DetailPage from "views/DetailPage/DetailePage";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Header
        brand="DMU Plate"
        rightLinks={<HeaderLinks />}
        fixed
        color="white"

      />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/profile" component={ProfilePage} exact />
      <Route path="/login" component={LoginPage} exact />
      <Route path="/signup" component={SignupPage} exact />
      <Route path="/store/add" component={StoreRegistration} exact />
      <Route path="/Components" component={Components} exact />
      <Route path="/detail/:restaurantSeq" component={DetailPage} exact />
    </Switch>
    <Footer />
  </Router>,
  document.getElementById("root")
);