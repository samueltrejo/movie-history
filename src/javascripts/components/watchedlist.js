import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import usermovieData from '../helpers/data/usermovie-data';
import moviesData from '../helpers/data/movies-data';
import join from '../helpers/join';
import print from '../helpers/print';

const overlayEvents = () => {
  $('.card-img-overlay').hide();
  $('.movie-image').mouseover((event) => {
    const overlayId = event.target.nextElementSibling.id;
    $(`#${overlayId}`).fadeIn();
    $(`#${overlayId}`).mouseleave(() => {
      $(`#${overlayId}`).hide();
    });
  });
};
const deleteMovie = (event) => {
  const usermovieId = event.target.dataset.value;
  usermovieData.deleteUsermovie(usermovieId)
    .then(() => {
      initWatchedList(); // eslint-disable-line no-use-before-define
    })
    .catch();
};

const writeUsermovies = (usermovies) => {
  let domString = '';
  usermovies.forEach((usermovie) => {
    domString += '<div class="col-3 p-3 movie-card">';
    domString += `  <img id=${usermovie.id}-image src=${usermovie.movieImage} class="d-block w-100 movie-image position-relative" alt="movie cover of ${usermovie.movieTitle}" onerror="imageError(this)">`;
    domString += `  <div id="${usermovie.id}-overlay" class="card-img-overlay bg-overlay m-3">`;
    domString += `    <span data-value="${usermovie.id}" class="delete-movie delete-movie-icon material-icons">add_circle_outline</span>`;
    domString += `    <span class="rating-icon btn btn-outline-light">${usermovie.movieMpaa}</span>`;
    domString += `    <h5 class="overlay-title text-white text-center">${usermovie.movieTitle}</h5>`;
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('watchedlist', domString);
  overlayEvents();
  $('.delete-movie').click(deleteMovie);
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
