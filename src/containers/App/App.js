import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import './App.css';
import Navigation from '../../components/Navigation/Navigation.js';
import SignIn from '../../components/SignIn/SignIn.js';
import Register from '../../components/Register/Register.js';
import About from '../../components/About/About.js';
import UserHome from '../../components/Home/UserHome.js';
import GuestHome from '../../components/Home/GuestHome.js';
import CreateGroup from '../../components/CreateGroup/CreateGroup.js';
import Groups from '../../components/Groups/Groups.js';



class App extends React.Component {
  
  render(){
    console.log('APP STATE',this.props)
    const {auth} = this.props;
    return(
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/'             render={() => <GuestHome  />}/>
          <Route exact path='/home'         render={() => <UserHome   />}/>
          <Route exact path='/creategroup'  render={() => <CreateGroup/>}/>
          <Route exact path='/groups'       render={() => <Groups     />}/>
          <Route exact path='/signin'       render={() => <SignIn     />}/>
          <Route exact path='/register'     render={() => <Register   />}/>
          <Route exact path='/about'        render={() => <About      />}/>
        </Switch>
      </div>
    )
  }

}



const mapStateToProps = (state) => {
  const {userAccess} = state;
  return {
    auth: userAccess.auth,
    user_id: userAccess.user_id,
    username: userAccess.username,
    email: userAccess.email,
    groups: userAccess.groups,
    score: userAccess.score,
    error: userAccess.error
  }

}



export default withRouter(connect(mapStateToProps)(App));
