import firebase from 'firebase/app';

import auth from './components/auth';
import authData from './helpers/data/auth-data';
import navEvents from './helpers/nav-events';

import fbref from './helpers/fbconfig.json';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(fbref.firebaseConfig);
  auth.signInEvents();
  authData.checkLoginStatus();
  navEvents.attachNavEvents();
};

init();
