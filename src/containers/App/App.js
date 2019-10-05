import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import './App.css';
import Navigation from '../../components/Navigation/Navigation.js';
import SignIn from '../../components/SignIn/SignIn.js';
import Register from '../../components/Register/Register.js';
import About from '../../components/About/About.js';
import Home from '../../components/Home/Home.js';
import Dash from '../../components/Dash/Dash';
import CreateNewGroup from '../../components/CreateGroup/CreateNewGroup.js';
import GroupsPage from '../../components/GroupsPage/GroupsPage.js';
import Settings from '../../components/Settings/Settings';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import ProtectedRoute from '../../components/ProtectedRoute';

toast.configure({
  position:"bottom-center",
  autoClose:2000,
  newestOnTop:false,
  rtl:false
})

class App extends React.Component {
  
  render(){
    return(
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/'             render={() => <Home       />}/>
          <Route exact path='/signin'       render={() => <SignIn     />}/>
          <Route exact path='/register'     render={() => <Register   />}/>
          <Route exact path='/about'        render={() => <About      />}/>
          <ProtectedRoute auth={this.props.auth} exact path='/dash'         render={() => <Dash           />}/>
          <ProtectedRoute auth={this.props.auth} exact path='/creategroup'  render={() => <CreateNewGroup />}/>
          <ProtectedRoute auth={this.props.auth} exact path='/groups'       render={() => <GroupsPage     />}/>
          <ProtectedRoute auth={this.props.auth} exact path='/settings'     render={() => <Settings       />}/>
          <Route path='/resetpassword/:str' render={() => <ResetPassword />}/>
        </Switch>
        <ToastContainer />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  const {user, settings} = state;
  return {
    auth: user.auth,
    resetAuth: settings.auth
  }

}

export default withRouter(connect(mapStateToProps)(App));
