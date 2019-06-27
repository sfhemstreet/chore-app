import React from 'react';
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

const initialState = {
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    groups: [],
    rank: '',
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = initialState;
  }

  render(){

    return(
      <div>
        <Navigation 
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        <Switch >
          <Route exact path='/' render={() => <GuestHome />}/>
          <Route exact path='/signin' render={() => <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>}/>
          <Route exact path='/register' render={() => <Register />}/>
          <Route exact path='/about' render={() => <About />}/>
          <Route exact path='/creategroup' render={() => <CreateGroup />}/>
          <Route exact path='/groups' render={() => <Groups />}/>
        </Switch>
      </div>
    )
  }

}

export default App;
