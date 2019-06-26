import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'

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

  onRouteChange = (event) => {

  }

  render(){

    return(
      <div>
        <Navigation 
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        { 
          
        }  
      </div>
    )


  }

}

export default App;
