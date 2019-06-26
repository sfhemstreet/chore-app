import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import About from './components/About/About.js';
import GuestHome from './components/GuestHome/GuestHome.js';
import UserHome from './components/UserHome/UserHome.js';
import CreateGroup from './components/CreateGroup/CreateGroup.js';
import Groups from './components/Groups/Groups.js';

const initialState = {
  route: 'home',
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

  onRouteChange = (route) => {
    if(route === 'signout'){
      return this.setState(initialState);
    }
    this.setState({route: route});
  }

  render(){

    return(
      <div>
        <Navigation 
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {{
          'home':
            <div> 
              {{
                true:
                  <div> 
                    <UserHome />
                  </div>,
                false:
                  <div> 
                    <GuestHome />
                  </div>,
              }[this.state.isSignedIn]
              }
            </div>,
          'signin':
            <div> 
              <SignIn />
            </div>,
          'register':
            <div> 
              <Register />
            </div>,
          'about':
            <div> 
              <About />
            </div>,
          'creategroup':
            <div> 
              <CreateGroup />
            </div>,
          'groups':
            <div> 
              <Groups />
            </div>,
         }[this.state.route]
        }  
      </div>
    )


  }

}

export default App;
