import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css'
import Header from './Header'
import Footer from './Footer'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline';
import Search from './pages/Search'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import View from './pages/View'


function App() {
  return (
    <div className = "app">
      <Header />
      <BrowserRouter>
        <Route exact={true} path="/signup" component={SignUp} />
        <Route exact={true} path="/signin" component={SignIn} />
        <Route exact={true} path="/" component={Timeline} />
        <Route exact={true} path="/search" component={Search} />
        <Route exact={true} path="/friends" component={Friends} />
        <Route exact={true} path="/profile" component={Profile} />
        <Route exact={true} path="/view" component={View} />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
