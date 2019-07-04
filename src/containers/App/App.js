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

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ProtectedRoute from '../../components/ProtectedRoute';

toast.configure({
  position:"bottom-center",
  autoClose:5000,
  hideProgressBar:false,
  newestOnTop:false,
  rtl:false
})

class App extends React.Component {
  
  render(){
    //console.log('APP STATE',this.props)
    const {auth} = this.props;
    return(
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/'             render={() => <GuestHome  />}/>
          <ProtectedRoute auth={this.props.auth} exact path='/home'         render={() => <UserHome   />}/>
          <ProtectedRoute auth={this.props.auth} exact path='/creategroup'  render={() => <CreateGroup/>}/>
          <ProtectedRoute auth={this.props.auth} exact path='/groups'       render={() => <Groups     />}/>
          <Route exact path='/signin'       render={() => <SignIn     />}/>
          <Route exact path='/register'     render={() => <Register   />}/>
          <Route exact path='/about'        render={() => <About      />}/>
        </Switch>
        <ToastContainer />
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
