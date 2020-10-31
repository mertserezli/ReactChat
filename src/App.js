import React, { useRef, useState } from 'react';
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
          <SignOut />
        </header>

        <section>
          {user ? <ChatRoomList /> : <SignIn />}
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

function ChatRoomList(){
    const query = firestore.collection('rooms');

    const [rooms] = useCollectionData(query, { idField: 'id' });
    const [curChatroom, setCurChatroom] = useState('');
    const [chatRoomValue, setchatRoomValue] = useState('');

    const addRoom = async (e) => {
        e.preventDefault();

        await query.doc(chatRoomValue).set({});

        setchatRoomValue('');
    };

    return (<>
        {curChatroom === '' ?
            <main>
                <span className={"notice"}>Pick A Chatroom</span>
                {rooms && rooms.map(room => <ChatRoomItem key={room.id} name={room.id} changeRoom = {setCurChatroom}/>)}
                <form id={"chatRoomCreate"}>
                    <input id="newRoom" onChange={(e) => setchatRoomValue(e.target.value)} placeholder="Create new room"/>
                    <button type="submit" onClick={addRoom}>➕</button>
                </form>
            </main>
            :
            <ChatRoom room = {curChatroom} back = {()=>setCurChatroom('')}/>
        }
    </>)
}

function ChatRoomItem(props){
    const roomName = props.name;
    const changeRoom = props.changeRoom;
    return(<>
        <button className={"room"} onClick={ ()=>changeRoom(roomName) }><span>{roomName}</span></button>
    </>)
}

function ChatRoom(props) {
    const roomName = props.room;
    const back = props.back;

    const dummy = useRef();
    const messagesRef = firestore.collection('rooms' ).doc(roomName).collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (<>
        <header>
            <p id={"chatRoomName"}>{roomName}</p>
            <button onClick={ ()=> back()}>Back</button>
        </header>
        <main>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

            <span ref={dummy}/>

        </main>

        <form id={"sendMessage"} onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}


function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}  alt={"profile"}/>
            <p>{text}</p>
        </div>
    </>)
}

export default App;
