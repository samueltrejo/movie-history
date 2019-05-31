import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import movies from '../../components/movies';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      movies.initMovies();
      $('.not-authed').css('display', 'none');
      $('.authed').css('display', '');
    } else {
      $('.not-authed').css('display', '');
      $('.authed').css('display', 'none');
    }
  });
};

export default { checkLoginStatus };
