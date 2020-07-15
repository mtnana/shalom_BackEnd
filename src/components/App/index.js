import React, { Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { withFirebase } from '../Firebase/firebase';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import AdminPage from '../Admin';
 
import * as ROUTES from '../../constants/routes';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  componentDidMount(){
  this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({ authUser})
      : this.setState({authUser: null});
    });
  }

  componentWillUnmount  () {
    this.listener();
  }
  

 
render() {
  return (
    <Router>
    <div>
 
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>

  );
}
}
 
 
export default withFirebase(App) ;