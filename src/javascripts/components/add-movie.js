import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

import moviesData from '../helpers/data/movies-data';
import movies from './movies';

const addMovie = () => {
  const newMovie = {
    title: $('#movie-title-input').val(),
    image: $('#movie-image-input').val(),
    mpaa: $('#movie-mpaa-input').val(),
  };
  moviesData.addMovie(newMovie)
    .then(() => {
      movies.initMovies(firebase.auth().currentUser.uid);
    })
    .catch(error => console.error(error));
};

export default { addMovie };
