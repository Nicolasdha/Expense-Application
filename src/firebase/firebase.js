import firebase from 'firebase';
import 'firebase/database';
import { toISODateString } from 'react-dates';


const firebaseConfig = {
    apiKey: "AIzaSyCtFjuKgzocwZOZKnhvZHyYj0mbh8fPEZs",
    authDomain: "overhead-2399c.firebaseapp.com",
    databaseURL: "https://overhead-2399c-default-rtdb.firebaseio.com",
    projectId: "overhead-2399c",
    storageBucket: "overhead-2399c.appspot.com",
    messagingSenderId: "523996820157",
    appId: "1:523996820157:web:3cddc928fd1b3cf7ce3dd4",
    measurementId: "G-LS6WEZ0REY"
  };


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();




// database.ref('expenses').on('value', (snapshot) =>{
//     const expenses = [];
//     snapshot.forEach((childSnapshot) =>{
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// });

database.ref('expenses').on('child_changed', (childSnapshot, prevChildKey) =>{
    console.log( childSnapshot.key, childSnapshot.val())
})








// database.ref('expenses').once('value').then( (snapshot) =>{
//     const expenses = [];
//     snapshot.forEach((childSnapshot) =>{
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses)
// });



// database.ref('expenses').push({
//     description: 'Rent',
//     amount: 1095,
//     notes: 'Rent sucks',
//     createdAt: 12948723982
// });
