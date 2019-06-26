import React from 'react';
import './App.css';

const initialState = {
  route: 'home',
  user: {},
  id: '',
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = initialState;
  }

  render(){

    /*
    <Navigation />
    <Home />

    */
    return(
      <div>

      </div>
    )


  }

}

export default App;
