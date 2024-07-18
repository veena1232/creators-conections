import firebase from 'firebase/compat/app';
import 'firebase/compat/database'; // Import the Firebase Realtime Database module

const firebaseConfig = {
  apiKey: "AIzaSyAWtBc_sgmVBYWC4aypgnt7LNTUku0bjcY",
  authDomain: "form-bf7f3.firebaseapp.com",
  databaseURL: "https://form-bf7f3-default-rtdb.firebaseio.com",
  projectId: "form-bf7f3",
  storageBucket: "form-bf7f3.appspot.com",
  messagingSenderId: "1071410758571",
  appId: "1:1071410758571:web:5ac9f166a46fd0ed4a88ee"
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export the database instance for use in your components
const db = firebaseApp.database();

export default db;
