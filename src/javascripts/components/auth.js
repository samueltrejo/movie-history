import firebase from 'firebase/app';
import 'firebase/auth';

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

const signInEvents = () => {
  document.getElementById('google-auth').addEventListener('click', signIn);
  document.getElementById('logout').addEventListener('click', signOut);
};

export default { signInEvents };
