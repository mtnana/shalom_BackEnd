
import * as firebase from 'firebase'
import FirebaseContext, { withFirebase } from './context';
import 'firebase/database';
import 'firebase/auth';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCKrat1ML5iC5YdUhiAhouyCJnUgAg7NaQ",
    authDomain: "arthurshalom-67210.firebaseapp.com",
    databaseURL: "https://arthurshalom-67210.firebaseio.com",
    projectId: "arthurshalom-67210",
    storageBucket: "arthurshalom-67210.appspot.com",
    messagingSenderId: "527856512482",
    appId: "1:527856512482:web:5cd11f06c75bdb8d2f9dbb",
    measurementId: "G-F9V09GCR16"
  };

  // Initialize Firebase
  class Firebase {
    constructor()  {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
  
  // iniatize auth
  this.auth = firebase.auth();
  this.db = firebase.database();

    }

      // *** Auth API ***
 
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email.value, password.value);

doSignInWithEmailAndPassword = (email, password) =>
this.auth.signInWithEmailAndPassword(email, password);

doSignOut = () => this.auth.signOut();

doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

    // *** User API ***
 
  user = uid => this.db.ref(`users/${uid}`);
 
  users = () => this.db.ref('users');
  }
  
  

  export default Firebase;
   
export { FirebaseContext, withFirebase }; 