import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyD9R6kGHkeETar9bqO-xR7I282DeNbWrCM",
    authDomain: "login-4a0ac.firebaseapp.com",
    projectId: "login-4a0ac",
    storageBucket: "login-4a0ac.appspot.com",
    messagingSenderId: "1031511896778",
    appId: "1:1031511896778:web:7b6c4c15c034b8a8eb3a33"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshosts : true})

export default firebase