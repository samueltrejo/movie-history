import firebase from 'firebase/app';
import 'firebase/auth';

import userMovieData from '../helpers/data/usermovie-data';

const initWatchedlist = (event) => {
  const userMovie = {
    movieId: event.target.closest('.card-img-overlay').previousElementSibling.id,
    uid: firebase.auth().currentUser.uid,
    isWatched: true,
    rating: null,
  };
  userMovieData.addUserMovie(userMovie);
};

export default { initWatchedlist };
