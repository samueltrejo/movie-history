import $ from 'jquery';

import movieData from '../helpers/data/movies-data';
import print from '../helpers/print';
import watchedlist from './watchedlist';

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

const writeMovies = (array) => {
  let domString = '';
  array.forEach((item) => {
    domString += '<div class="col-3 p-3 movie-card">';
    domString += `  <img id=${item.id} src=${item.image} class="d-block w-100 movie-image" alt="movie cover of ${item.title}">`;
    domString += `  <div id="${item.id}-overlay" class="card-img-overlay bg-overlay m-3">`;
    domString += `    <h5 class="overlay-title text-white">${item.title}</h5>`;
    domString += '    <button class="watched btn btn-outline-light">Watched</button>';
    domString += '  </div>';
    domString += '</div>';
  });
  print.printToDom('movies', domString);
  overlayEvents();
  $('.watched').click(watchedlist.initWatchedlist);
};

const initMovies = () => {
  movieData.getMovieData()
    .then((response) => {
      writeMovies(response);
    })
    .catch(error => console.error(error));
};

export default { initMovies };
