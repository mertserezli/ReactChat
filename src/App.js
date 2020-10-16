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
  const [user] = useAuthState(auth);

  return (
      <div className="App">
        <header>
          <h1>⚛️🔥💬</h1>
        </header>

        <section>
          {user ? <SignOut /> : <SignIn />}
        </section>

      </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <p>Do not violate the community guidelines or you will be banned for life!</p>
      </>
  )

}

function SignOut() {
  return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
