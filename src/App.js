import React, { Component } from 'react';
import ListingPage from './js/Components/ListingPage.jsx';
import Checkout from './js/Components/Checkout.jsx';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./js/Store/store.js";

import './App.css';
import './css/listing-page.css';
import './css/checkout.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact={true} path="/" component={ListingPage} />
            <Route exact={true} path="/checkout" component={Checkout} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
