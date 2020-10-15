import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCh2F87Ukh9PpqPle78O6RdgkQF_A4Fgsg",
  authDomain: "reactchatapp-278ec.firebaseapp.com",
  databaseURL: "https://reactchatapp-278ec.firebaseio.com",
  projectId: "reactchatapp-278ec",
  storageBucket: "reactchatapp-278ec.appspot.com",
  messagingSenderId: "993957926456",
  appId: "1:993957926456:web:d27f759901996f8840f8cd",
  measurementId: "G-ZYWEJ99EVV"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      </header>
    </div>
  );
}

export default App;
