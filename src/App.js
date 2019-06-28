import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import About from './components/About/About.js';
import UserHome from './components/Home/UserHome.js';
import GuestHome from './components/Home/GuestHome.js';
import CreateGroup from './components/CreateGroup/CreateGroup.js';
import Groups from './components/Groups/Groups.js';

import {requestSignIn} from './redux/actions/userActions.js';

const mapStateToProps = (state) => {
    
  //console.log('hello');

}

const mapDispatchToProps = (dispatch) => {
return {
  //onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
  //onSumbitSignIn: () => dispatch(requestSignIn())
}
}

class App extends React.Component {
  

  render(){

    return(
      <div>
        <Navigation />
        <Switch >
          <Route exact path='/'             render={() => <GuestHome />}/>
          <Route exact path='/signin'       render={() => <SignIn />}/>
          <Route exact path='/register'     render={() => <Register />}/>
          <Route exact path='/about'        render={() => <About />}/>
          <Route exact path='/creategroup'  render={() => <CreateGroup />}/>
          <Route exact path='/groups'       render={() => <Groups />}/>
        </Switch>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
