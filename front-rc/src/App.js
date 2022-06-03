import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import HomeScreen from './component/screens/HomeScreen';
import ProductScreen from './component/screens/ProductScreen';
import CartScreen from './component/screens/CartScreen';
import LoginScreen from './component/screens/LoginScreen';
import RegisterScreen from './component/screens/RegisterScreen';
import ProfileScreen from './component/screens/ProfileScreen';
import ShippingScreen from './component/screens/ShippingScreen';
import PaymnetScreen from './component/screens/PaymnetScreen';
import PlaceOrderScreen from './component/screens/PlaceOrderScreen';
import OrderScreen from './component/screens/OrderScreen';
import UsersListScreen from './component/screens/UsersListScreen';
import ProductsListScreen from './component/screens/ProductsListScreen';
import OrdersListScreen from './component/screens/OrdersListScreen';
import UserUpdateScreen from './component/screens/UserUpdateScreen';
import CreateProductScreen from './component/screens/CreateProductScreen';

function App() {
  return (
    <Fragment>
      <Router>
      <Header />
      <main className="my-2">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/userslist" component={UsersListScreen} />
          <Route path="/admin/user/:id/edit" component={UserUpdateScreen} />
          <Route path="/admin/productslist" component={ProductsListScreen} />
          <Route path="/admin/newproduct" component={CreateProductScreen} />
          <Route path="/admin/orderslist" component={OrdersListScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymnetScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
        </Container>
      </main>
      <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
