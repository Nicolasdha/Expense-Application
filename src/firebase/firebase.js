import firebase from 'firebase';
import 'firebase/database';


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

  const database = firebase.database() 
  database.ref().set({
    name: 'Nicolas Ha',
    age: 29999,
    isSingle: true,
    stressLevel: 6,
    job: {
        title: 'Software dev',
        company: 'Google'
    },
    location: {
        city: 'Denver',
        state: 'Colorado',
        country: "United States"
    }
  });

  database.ref()
    .once('value')
    .then((snapshot)=> {
        console.log(snapshot.val())
    })
    .catch(()=> {
        console.log(e, 'error fetching data')
    })




// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': "Seattle"
// })

//   database.ref('age').set(30);
//   database.ref('location/city').set('Charlotteville');
//   database.ref('attributes').set({
//       height: '6FT1IN',
//       weight: 160,
//   }).then(() =>{
//     console.log('data saved ')
//     }).catch((error)=>{
//         console.log('Error:', error)
//     });

// database.ref('isSingle')
//     .remove()
//     .then(()=>{
//         console.log('removed')
//     })
//     .catch((e)=>{
//         console.log(e, 'error occured ')
//     })
// database.ref('attributes/height').remove()

// database.ref().update({
//     job: 'Project Manager',
//     'location/city': 'Boston'
// })

