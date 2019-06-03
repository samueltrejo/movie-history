import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import movieData from '../helpers/data/movies-data';
import print from '../helpers/print';
import usermovieData from '../helpers/data/usermovie-data';
import join from '../helpers/join';

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

const addToWatched = (event) => {
  const { uid } = firebase.auth().currentUser;
  const usermovieId = event.target.id;
  const userMovie = {
    movieId: event.target.closest('.card-img-overlay').previousElementSibling.id,
    uid,
    isWatched: true,
    rating: null,
  };
  if (usermovieId === 'undefined') {
    console.error(usermovieId);
    usermovieData.addUserMovie(userMovie)
      .then(() => initMovies(uid)) // eslint-disable-line no-use-before-define
      .catch(error => console.error(error));
  }
};

const writeMovies = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += '<div class="col-3 p-3 movie-card">';
    domString += `  <img id=${item.id} src=${item.image} class="d-block w-100 movie-image" alt="movie cover of ${item.title}">`;
    domString += `  <div id="${item.id}-overlay" class="card-img-overlay bg-overlay m-3">`;
    domString += `    <h5 class="overlay-title text-white">${item.title}</h5>`;
    domString += `    <button id="${item.usermovieId}" class="watched btn btn-outline-light">Watched</button>`;
    domString += `    ${item.isWatched ? '<i class="material-icons text-white">check</i>' : ''}`;
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('movies', domString);
  overlayEvents();
  $('.watched').click(addToWatched);
};

const initMovies = (uid) => {
  movieData.getMovieData()
    .then((movies) => {
      usermovieData.getUsermoviesByUid(uid)
        .then((usermovies) => {
          const newMovies = join.moviesUsermovies(movies, usermovies);
          console.error(newMovies);
          writeMovies(newMovies);
        });
    })
    .catch(error => console.error(error));
};

export default { initMovies };
