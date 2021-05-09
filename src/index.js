import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase'
import {Provider} from 'react-redux'
import store from './store/index'


const  firebaseConfig = {
  apiKey: "AIzaSyCzyOKvIqzJETyt_lv2GGUi1SiM9zH_jUc",
  authDomain: "chatapplication-52ec3.firebaseapp.com",
  projectId: "chatapplication-52ec3",
  storageBucket: "chatapplication-52ec3.appspot.com",
  messagingSenderId: "102694609520",
  appId: "1:102694609520:web:587411f18375d47f25cab5",
  measurementId: "G-DY2DZLYJWR"
};

window.store = store
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <Provider store={store}> <App /></Provider>
 
  ,
  document.getElementById('root')
);


