import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import addMovie from '../../components/add-movie';

import movies from '../../components/movies';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      movies.initMovies(user.uid);
      $('.not-authed').hide();
      $('.authed-hidden').hide();
      $('.authed').show();
      $('#add-movie').click(addMovie.addMovie);
    } else {
      $('.not-authed').show();
      $('.authed').hide();
      $('.authed-hidden').hide();
    }
  });
};

export default { checkLoginStatus };
