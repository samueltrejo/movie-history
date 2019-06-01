import axios from 'axios';
import fbref from '../fbconfig.json';

const firebaseUrl = fbref.firebaseConfig.databaseURL;

const addUserMovie = userMovie => axios.post(`${firebaseUrl}/userMovies.json`, userMovie);

export default { addUserMovie };
