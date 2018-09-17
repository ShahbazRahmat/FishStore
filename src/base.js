import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAuwXJhX8-mOBwDuX5swmOsYV5CF1yLBxs",
    authDomain: "catch-of-the-day-shahbaz.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-shahbaz.firebaseio.com",
    projectId: "catch-of-the-day-shahbaz",
    storageBucket: "catch-of-the-day-shahbaz.appspot.com",
    messagingSenderId: "1058291255467"
});

const base =  Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;