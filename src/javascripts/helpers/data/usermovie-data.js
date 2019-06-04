import axios from 'axios';
import fbref from '../fbconfig.json';

const firebaseUrl = fbref.firebaseConfig.databaseURL;

const addUserMovie = userMovie => axios.post(`${firebaseUrl}/usermovies.json`, userMovie);

const editUsermovie = (usermovie, usermoviesId) => axios.put(`${firebaseUrl}/usermovies/${usermoviesId}.json`, usermovie);

const getUsermoviesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/usermovies.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const usermoviesResults = results.data;
      const usermovies = [];
      Object.keys(usermoviesResults).forEach((usermoviesId) => {
        usermoviesResults[usermoviesId].id = usermoviesId;
        usermovies.push(usermoviesResults[usermoviesId]);
      });
      resolve(usermovies);
    })
    .catch(error => reject(error));
});

export default { addUserMovie, editUsermovie, getUsermoviesByUid };
