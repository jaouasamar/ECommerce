import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from "react-bootstrap";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
function App() {
  return (
    <Router>
    <Header/>
    <main className='py-3'>
      <Container> 
        <Route path='/login' component={LoginScreen}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/product/:id' component={ProductScreen}/>
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/admin/userList' component={UserListScreen}/>
        <Route path='/admin/productList' component={ProductListScreen}/>
        <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
        <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
        <Route path='/admin/product/create' component={ProductCreateScreen}/>
        <Route path='/search/:keyword' component={HomeScreen} exact/>
        <Route path='/page/:pageNumber' component={HomeScreen} exact  />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            
          />
      </Container>
   
    </main>
     <Footer/>
    </Router>
  );
}

export default App;
