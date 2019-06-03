import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import movies from '../../components/movies';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      movies.initMovies(user.uid);
      $('.not-authed').hide();
      $('.authed').show();
    } else {
      $('.not-authed').show();
      $('.authed').hide();
    }
  });
};

export default { checkLoginStatus };
