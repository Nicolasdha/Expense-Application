const promise = new Promise((resolve, reject) =>{
    resolve({name: 'Nicolas', age: 29});
    reject('something went wrong')
  });

  promise.then((data) =>{
      console.log('1', data)
      return new Promise((resolve, reject) =>{
        resolve('This is my other promise');
      });

  }).then((str)=>{
      console.log('This string was passed down by the promise', str)

  }).catch((error)=>{
      console.log('Error:', error)
  })

/* 
In a promise chain:

We can return nothing, the next .then() will fire but with no info passed in 

We can return a value that the next .thn() will have access to 

We can also return another promise - if we return a promise the next .then() CB is that promises success case - the RETURN keyword is important before the promise, if it is there the next .then() will be its success case and will only run when that promise actually resolves and if it is NOT than it will not be 

This reduces needs for nested callbacks


*/