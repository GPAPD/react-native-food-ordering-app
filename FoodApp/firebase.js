// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaS***********************1E",
  authDomain: "myapp-b8baf.firebaseapp.com",
  projectId: "myapp-b8baf",
  storageBucket: "myapp-b8baf.appspot.com",
  messagingSenderId: "177204929789",
  appId: "1:1**************f795ca94"
};

// Initialize Firebase

if(!firebase.apps.length ){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
