const moviesUsermovies = (movies, usermovies) => movies.map((movie) => {
  const newMovie = movie;
  const specificUsermovie = usermovies.find(usermovie => usermovie.movieId === movie.id);
  if (specificUsermovie) {
    newMovie.usermovieId = specificUsermovie.id;
    newMovie.isWatched = specificUsermovie.isWatched;
  }
  return newMovie;
});

const usermoviesMovies = (usermovies, movies) => usermovies.map((usermovie) => {
  const newUsermovie = usermovie;
  const specificMovie = movies.find(movie => movie.id === usermovie.movieId);
  if (specificMovie) {
    newUsermovie.movieImage = specificMovie.image;
    newUsermovie.movieTitle = specificMovie.title;
    newUsermovie.movieMpaa = specificMovie.mpaa;
  }
  return newUsermovie;
});

export default { moviesUsermovies, usermoviesMovies };
