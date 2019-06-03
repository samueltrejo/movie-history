import $ from 'jquery';
import watchedlist from '../components/watchedlist';

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
};

const attachNavEvents = () => {
  $('#show-watchedlist').click(showWatchedlist);
  $('#show-movies').click(showMovies);
  $('#home').click(showMovies);
};

export default { attachNavEvents };
