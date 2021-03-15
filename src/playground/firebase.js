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
    age: 29,
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






// database.ref().on('value', (snapshot)=>{console.log(snapshot.val())})


//   database.ref()
//     .once('value')
//     .then((snapshot)=> {
//         console.log(snapshot.val())
//     })
//     .catch(()=> {
//         console.log(e, 'error fetching data')
//     })





const subscription = database.ref().on('value', (snapshot)=>{
    const val = snapshot.val();
    const innerFunction = ( { name, age, job, location } ) =>{
        console.log(`${name} is pooping and is ${age} and works for ${job.company} in ${location.city}`)
    }
    innerFunction(val)
});

database.ref().update({
    stressLevel: 9,
    'job/company': 'Amazon',
    'location/city': "Seattle"
})

// database.ref().off('value', subscription)

database.ref().update({
    stressLevel: 9,
    'job/company': 'Poopinheim',
    'location/city': "Hell"
})

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



database.ref('notes').push({
    title: 'todo',
    body: 'clean'
})

database.ref('notes').push({
  title: 'dinner',
  body: 'paster'
})

database.ref('notes/-MVrMbUwraJHHeotVG20').update({body: "Workout"})






database.ref('expenses').on('value', (snapshot) =>{
    const expenses = [];
    snapshot.forEach((childSnapshot) =>{
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        })
    })
    console.log(expenses)
});

database.ref('expenses').on('child_changed', (childSnapshot, prevChildKey) =>{
    console.log( childSnapshot.key, childSnapshot.val())
})





