import axios from 'axios';
import fbref from '../fbconfig.json';

const firebaseUrl = fbref.firebaseConfig.databaseURL;

const addMovie = newMovie => axios.post(`${firebaseUrl}/movies.json`, newMovie);

const getMovieData = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json`)
    .then((results) => {
      const movieResults = results.data;
      const movies = [];
      Object.keys(movieResults).forEach((movieId) => {
        movieResults[movieId].id = movieId;
        movies.push(movieResults[movieId]);
      });
      resolve(movies);
    })
    .catch(error => reject(error));
});

export default { getMovieData, addMovie };
