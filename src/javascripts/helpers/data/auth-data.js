import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('.not-authed').css('display', 'none');
      $('.authed').css('display', '');
    } else {
      $('.not-authed').css('display', '');
      $('.authed').css('display', 'none');
    }
  });
};

export default { checkLoginStatus };
