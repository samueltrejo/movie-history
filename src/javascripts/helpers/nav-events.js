import firebase from 'firebase/app';
import 'firebase/auth';

import $ from 'jquery';
import watchedlist from '../components/watchedlist';
import movies from '../components/movies';

const hideAll = () => {
  $('#movies-view').hide();
  $('#watchedlist-view').hide();
};

const showWatchedlist = () => {
  hideAll();
  $('#watchedlist-view').show();
  watchedlist.initWatchedList();
};

const showMovies = () => {
  hideAll();
  $('#movies-view').show();
  movies.initMovies(firebase.auth().currentUser.uid);
};

const attachNavEvents = () => {
  $('#show-watchedlist').click(showWatchedlist);
  $('#show-movies').click(showMovies);
  $('#home').click(showMovies);
};

export default { attachNavEvents };
