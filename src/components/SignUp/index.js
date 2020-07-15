import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose'

import { withFirebase } from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div>
    
     <SignUpForm/>
     <SignInLink/>
    
  </div>
);  
 const INITIAL_STATE = {
     username:'',
     email: '',
     passwordOne: '',
     passwordTwo: '',
     error: null,
 };

 class SignUpFormBase extends Component {


    onSubmit = (event) => {
        const { username, email, passwordOne } = this.setState;
     
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({ error });
          });
     
        event.preventDefault();

 }

 
 
  onChange = event => {
      this.setState({ [event.target.name]: event.target.value});
 
  };
 
  render() {

      const {
          username,
          email,
          passwordOne,
          passwordTwo,
          error,
      } = this.setState;

      const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (

        <div className="signup-form">
          <form onSubmit={this.onSubmit}>
          <h2 align = "text-center"> Shalom Arthur App</h2>
          <p>Cr&eacute;er Votre Compte</p>
          <hr/>
          
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-user">
                  
                  </span>
                </span>  
              
              </div>
              <input className="form-control"
               name="username"
               value={username}
               onChange={this.onChange}
               type="text"
               placeholder="Full Name"
               required="required"/>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                 <i className="fa fa-paper-plane"></i>
                </span>  
              
              </div>
              <input className="form-control"
               name="email"
               value={email}
               onChange={this.onChange}
               type="email"
               placeholder="Email Address"
               required="required"/>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                 <i className="fa fa-lock"></i>
                </span>  
              
              </div>
              <input className="form-control"
               name="passwordOne"
               value={passwordOne}
               onChange={this.onChange}
               type="text"
               placeholder="Password"
               required="required"/>
            </div>
          </div>

          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                 <i className="fa fa-lock"></i>
                 <i className="fa fa-check"></i>
                </span>  
              
              </div>
              <input className="form-control"
               name="passwordTwo"
               value={passwordTwo}
               onChange={this.onChange}
               type="text"
               placeholder="Confirm Password"
               required="required"/>
            </div>
          </div>

          <div className="form-group">
            <label className="form-check-label">
            <input type="checkbox"
              required="required"/>I accept the<a href="#">Terms of Use</a>
              &amp;  <a href="#">Privacy Policy</a></label>
          </div>
          <div className="form-group">
            <button disabled={ isInvalid } className="btn btn-primary btn-lg">Sign Up</button>
          </div>

           {error && <p>{error.message}</p>}
          </form>

         
        </div>  
        

    );
  }
}
 
const SignInLink = () => (
  <div className="text-center">
   <Link to={ROUTES.SIGN_IN}>Login Here</Link>
  
  </div>
    
  
);
 
const SignUpForm = compose(
  withRouter,
   withFirebase,

)  (SignUpFormBase);

export default SignUpPage;
 
export { SignUpForm};