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
    usermovieData.addUserMovie(userMovie)
      .then(() => initMovies(uid)) // eslint-disable-line no-use-before-define
      .catch(error => console.error(error));
  }
};

const addToWatchedWithRating = (previousRating, rating, usermovieId, movieId) => {
  const { uid } = firebase.auth().currentUser;

  const userMovie = {
    movieId,
    uid,
    isWatched: true,
    rating,
  };
  if (usermovieId === 'undefined') {
    usermovieData.addUserMovie(userMovie)
      .then(() => initMovies(uid)) // eslint-disable-line no-use-before-define
      .catch(error => console.error(error));
  } else {
    usermovieData.editUsermovie(userMovie, usermovieId)
      .then(() => initMovies(uid)) // eslint-disable-line no-use-before-define
      .catch(error => console.error(error));
  }
};

const attachRatingEvents = (event) => {
  const movieId = event.target.id;
  const usermovieId = event.target.dataset.value;
  const previousRating = document.getElementById(`${movieId}-rating`).dataset.value;

  const star1 = document.getElementById(`star1.${movieId}`);
  const star2 = document.getElementById(`star2.${movieId}`);
  const star3 = document.getElementById(`star3.${movieId}`);
  const star4 = document.getElementById(`star4.${movieId}`);
  const star5 = document.getElementById(`star5.${movieId}`);

  let star1state = document.getElementById(`star1.${movieId}`).textContent;
  let star2state = document.getElementById(`star2.${movieId}`).textContent;
  let star3state = document.getElementById(`star3.${movieId}`).textContent;
  let star4state = document.getElementById(`star4.${movieId}`).textContent;
  let star5state = document.getElementById(`star5.${movieId}`).textContent;

  star1.addEventListener('click', () => {
    star1.style = 'animation-name: bounce';
    setTimeout(() => {
      star1.style = 'animation-name: ""';
    }, 400);

    if (star1state === 'star') {
      star1state = 'star_border';
      star2state = 'star_border';
      star3state = 'star_border';
      star4state = 'star_border';
      star5state = 'star_border';
      addToWatchedWithRating(previousRating, 0, usermovieId, movieId);
    } else {
      star1state = 'star';
      star2state = 'star_border';
      star3state = 'star_border';
      star4state = 'star_border';
      star5state = 'star_border';
      addToWatchedWithRating(previousRating, star1.dataset.value, usermovieId, movieId);
    }
  });

  star2.addEventListener('click', () => {
    star1.style = 'animation-name: bounce';
    star2.style = 'animation-name: bounce';
    setTimeout(() => {
      star1.style = 'animation-name: ""';
      star2.style = 'animation-name: ""';
    }, 400);

    star1state = 'star';
    star2state = 'star';
    star3state = 'star_border';
    star4state = 'star_border';
    star5state = 'star_border';
    addToWatchedWithRating(previousRating, star2.dataset.value, usermovieId, movieId);
  });

  star3.addEventListener('click', () => {
    star1.style = 'animation-name: bounce';
    star2.style = 'animation-name: bounce';
    star3.style = 'animation-name: bounce';
    setTimeout(() => {
      star1.style = 'animation-name: ""';
      star2.style = 'animation-name: ""';
      star3.style = 'animation-name: ""';
    }, 400);

    star1state = 'star';
    star2state = 'star';
    star3state = 'star';
    star4state = 'star_border';
    star5state = 'star_border';
    addToWatchedWithRating(previousRating, star3.dataset.value, usermovieId, movieId);
  });

  star4.addEventListener('click', () => {
    star1.style = 'animation-name: bounce';
    star2.style = 'animation-name: bounce';
    star3.style = 'animation-name: bounce';
    star4.style = 'animation-name: bounce';
    setTimeout(() => {
      star1.style = 'animation-name: ""';
      star2.style = 'animation-name: ""';
      star3.style = 'animation-name: ""';
      star4.style = 'animation-name: ""';
    }, 400);

    star1state = 'star';
    star2state = 'star';
    star3state = 'star';
    star4state = 'star';
    star5state = 'star_border';
    addToWatchedWithRating(previousRating, star4.dataset.value, usermovieId, movieId);
  });

  star5.addEventListener('click', () => {
    star1.style = 'animation-name: bounce';
    star2.style = 'animation-name: bounce';
    star3.style = 'animation-name: bounce';
    star4.style = 'animation-name: bounce';
    star5.style = 'animation-name: bounce';
    setTimeout(() => {
      star1.style = 'animation-name: ""';
      star2.style = 'animation-name: ""';
      star3.style = 'animation-name: ""';
      star4.style = 'animation-name: ""';
      star5.style = 'animation-name: ""';
    }, 400);

    star1state = 'star';
    star2state = 'star';
    star3state = 'star';
    star4state = 'star';
    star5state = 'star';
    addToWatchedWithRating(previousRating, star5.dataset.value, usermovieId, movieId);
  });

  $('.star').mouseover((starEvent) => {
    const starId = starEvent.target.id;
    const starMovieId = starId.split('.');

    if (starMovieId[0] === 'star1') {
      document.getElementById(`star1.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star2.${starMovieId[1]}`).textContent = 'star_border';
      document.getElementById(`star3.${starMovieId[1]}`).textContent = 'star_border';
      document.getElementById(`star4.${starMovieId[1]}`).textContent = 'star_border';
      document.getElementById(`star5.${starMovieId[1]}`).textContent = 'star_border';
    } else if (starMovieId[0] === 'star2') {
      document.getElementById(`star1.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star2.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star3.${starMovieId[1]}`).textContent = 'star_border';
      document.getElementById(`star4.${starMovieId[1]}`).textContent = 'star_border';
      document.getElementById(`star5.${starMovieId[1]}`).textContent = 'star_border';
    } else if (starMovieId[0] === 'star3') {
      document.getElementById(`star1.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star2.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star3.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star4.${starMovieId[1]}`).textContent = 'star_border';
      document.getElementById(`star5.${starMovieId[1]}`).textContent = 'star_border';
    } else if (starMovieId[0] === 'star4') {
      document.getElementById(`star1.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star2.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star3.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star4.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star5.${starMovieId[1]}`).textContent = 'star_border';
    } else if (starMovieId[0] === 'star5') {
      document.getElementById(`star1.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star2.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star3.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star4.${starMovieId[1]}`).textContent = 'star';
      document.getElementById(`star5.${starMovieId[1]}`).textContent = 'star';
    }

    $('.rating').mouseleave(() => {
      document.getElementById(`star1.${starMovieId[1]}`).textContent = star1state;
      document.getElementById(`star2.${starMovieId[1]}`).textContent = star2state;
      document.getElementById(`star3.${starMovieId[1]}`).textContent = star3state;
      document.getElementById(`star4.${starMovieId[1]}`).textContent = star4state;
      document.getElementById(`star5.${starMovieId[1]}`).textContent = star5state;
    });
  });
};

const writeMovies = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += '<div class="col-3 p-3 movie-card">';
    domString += `  <img id=${item.id} src=${item.image} class="d-block w-100 movie-image" alt="movie cover of ${item.title}" data-value="${item.usermovieId}">`;
    domString += `  <div id="${item.id}-overlay" class="card-img-overlay bg-overlay m-3">`;
    domString += `    <h5 class="overlay-title text-white">${item.title}</h5>`;
    domString += `    <button id="${item.usermovieId}" class="watched btn btn-outline-light">Watched</button>`;
    domString += `    ${item.isWatched ? '<i class="material-icons text-white">check</i>' : ''}`;
    domString += `    <div id="${item.id}-rating" class="rating d-flex flex-wrap text-white mt-2" data-value="${item.rating}">`;
    domString += `      <span id="star1.${item.id}" class="star material-icons mx-1" data-value="1">${item.rating >= 1 ? 'star' : 'star_border'}</span>`;
    domString += `      <span id="star2.${item.id}" class="star material-icons mx-1" data-value="2">${item.rating >= 2 ? 'star' : 'star_border'}</span>`;
    domString += `      <span id="star3.${item.id}" class="star material-icons mx-1" data-value="3">${item.rating >= 3 ? 'star' : 'star_border'}</span>`;
    domString += `      <span id="star4.${item.id}" class="star material-icons mx-1" data-value="4">${item.rating >= 4 ? 'star' : 'star_border'}</span>`;
    domString += `      <span id="star5.${item.id}" class="star material-icons mx-1" data-value="5">${item.rating >= 5 ? 'star' : 'star_border'}</span>`;
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('movies', domString);
  overlayEvents();
  $('.watched').click(addToWatched);
  $('.movie-image').mouseover(attachRatingEvents);
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
