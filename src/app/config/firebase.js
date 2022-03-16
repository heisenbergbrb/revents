import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCNDNM3zpJwuq8wyyExd4Y2R16-bvo--Q",
  authDomain: "reventscourse-1af08.firebaseapp.com",
  projectId: "reventscourse-1af08",
  storageBucket: "reventscourse-1af08.appspot.com",
  messagingSenderId: "131854442992",
  appId: "1:131854442992:web:34ed304d838f4213bb7d35",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
