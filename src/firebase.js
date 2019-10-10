import * as firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOXjjIA4ry5PTCvR3eADx234TC3G3Ta_g",
  authDomain: "thyhive-50406.firebaseapp.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
