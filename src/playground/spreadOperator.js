const names = ['zuko', 'mai', 'katara', 'hakoda'];

// Want to add a new item on without actually changing names
names.push('sokka') // This actually changes the names array


names.concat('sokka') // This doesnt change the names array and returns a new array with name added 

/*
 
-------    SPREAD OPERATOR W/ ARRAYS-----

Can use the spread operator to do what concat does and add something onto an array without changing the actual array


const newNames = ['Aang', ...names, 'Toph']


Saying: as we create this array I want to add all of the items from names and add on a new one and this DOESNT change names 

*/


/*

---------------- SPREAD OPERATOR WITH OBJECTS --------------

Allows to define a new object while grabbing items from existing objects

*/


const user = {
    name: 'Nicolas',
    age: 29,
}

console.log({
    ...user,
})

/* 

This will throw an error since object spread operator isnt main stream so need to customize the .babelrc plugins configuration to use it, and use  yarn add babel-plugin-transform-object-rest-spread@latest


"plugins": [
        "transform-class-properties",
        "transform-object-rest-spread",

    ]

*/


let newUser = {
    ...user,
    location: "Denver",
    age: 55
    //This will override the user.age property
}


let newUser = {
    age: 55,
    //The user.age prop will override the age prop
    ...user,
    location: "Denver",
}

/*

The overriding is really useful b/c we dont want to actually change any of the objects that make up the redux store, instead we just want to clone them adding or overriding values 

*/