import React, { Component } from 'react';
import {Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 

import { withFirebase } from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
  <div>

    <SignInForm />
    <SignUpLink />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.ADMIN);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
          <div className="modal-dialog modal-login">
          <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title"> Member Login</h4>
        
          </div>

            <div className="modal-body">

            <form onSubmit={this.onSubmit} >

                <div className="form-group">
                    <i className="fa fa-user"></i>
                      <input className="form-control"
                         name="email"
                         value={email}
                         onChange={this.onChange}
                         type="text"
                         placeholder="Email Address">
                      </input>
                </div> 

                <div className="form-group">
                    <i className="fa fa-lock"></i>
                      <input className="form-control"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Password">
                      </input>
                </div>
                
                <div className="form-group">
                 
                      <input className="btn btn-primary btn-block btn-lg"
                      disabled={isInvalid}
                        type="submit"
                        value="Login">
                      </input>
                </div> 


               {error && <p>{error.message}</p>}
            </form>
            </div>

          
          </div>
          </div>

          


    );
  }
}

const SignUpLink = () => (
  <div className="text-center">
  Don't have an account? <Link to={ROUTES.SIGN_UP}>Login Here</Link>
  
  </div>
);
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };