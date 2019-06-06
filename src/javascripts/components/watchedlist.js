import firebase from 'firebase/app';
import 'firebase/auth';

import usermovieData from '../helpers/data/usermovie-data';
import moviesData from '../helpers/data/movies-data';
import join from '../helpers/join';
import print from '../helpers/print';

const writeUsermovies = (usermovies) => {
  let domString = '';
  usermovies.forEach((usermovie) => {
    domString += '<div class="col-3 p-3 movie-card">';
    domString += `  <img id=${usermovie.id}-image src=${usermovie.movieImage} class="d-block w-100 movie-image" alt="movie cover of ${usermovie.movieTitle}" onerror="imageError(this)">`;
    domString += `  <div id="${usermovie.id}-overlay" class="card-img-overlay bg-overlay m-3">`;
    domString += `    <h5 class="overlay-title text-white">${usermovie.movieTitle}</h5>`;
    domString += `    <button id="${usermovie.id}" class="watched btn btn-outline-light">Delete</button>`;
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('watchedlist', domString);
};

const initWatchedList = () => {
  const { uid } = firebase.auth().currentUser;
  usermovieData.getUsermoviesByUid(uid)
    .then((usermovies) => {
      moviesData.getMovieData()
        .then((movies) => {
          const newUsermovies = join.usermoviesMovies(usermovies, movies);
          writeUsermovies(newUsermovies);
        });
    })
    .catch(error => console.error(error));
};

export default { initWatchedList };
