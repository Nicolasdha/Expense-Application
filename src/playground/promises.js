const promise = new Promise((resolve, reject) =>{
    resolve({name: 'Nicolas', age: 29});
    reject('something went wrong')
  });

  promise.then((data) =>{
      console.log(data)
  }).catch((error)=>{
      console.log('Error:', error)
  })
