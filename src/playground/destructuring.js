/* 
---------------- OBJECT DESTRUCTURING ------------------

*/


// const person = {
//     name: 'Nicolas',
//     age:29,
//     location: {
//         city: 'Ocean Shores',
//         temperature: 40
//     },
// }

// const { name, age } = person;
// const { city, temperature } = person.location

// console.log(`${name} is ${age} and lives in ${city} where it is ${temperature}`);


const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    },
}

const { name: publisherName = 'Self Publish'} = book.publisher

console.log(publisherName)

// publisherName with DV as 'Self Publish'


/* 
---------------- ARRAY DESTRUCTURING ------------------

*/


const address = ['6303 Starlight Drive', 'Morrison', 'Colorado' ];

const [ , , state, zip = '20602' ] = address;

console.log(`You are in the state ${state} in the zip ${zip}`);


const item = ['Coffee (hot)', '$2.00', '$2.50' ,'$3.00'];

const [itemName, , , largeCoffeePrice] = item;

console.log(`A large ${itemName} is ${largeCoffeePrice}`)





/* 

----------- ARGUMENT DESTRUCTURING -------

Can destructure arguments to function if they are an object or an array


For Object argument: use object property name 

For Array argument: use array position

*/

let add = ({ a, b }, c) => a + b + c;
console.log(add({ a:1, b:2 }, 3));

let add = ([, a, b]) => a + b;
console.log(add([1, 2, 3]))


/* 

-------- Using default values with Destructuring ------



*/

let incrementCount = (payload = {}) => ({
    // Implicitly returning an object
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});

/* 

First you would take the argument payload and replace it with an object with the property name we want to destructure, incrementBy. This gives us access to the increment by value so we can access it directly so we delete the payload. infront of payload.incrementBy


*/


let incrementCount = ({ incrementBy } = {} ) => ({
    type: 'INCREMENT',
    incrementBy: typeof incrementBy === 'number' ? incrementBy : 1
});

/*


Then when we destructure we can set up default values. So we add one to { incrementBy } to say, "if increment by exists great but if not use 1"

{ incrementBy = 1 }

This way we would be able to simplify the code even further b/c instead of using a ternary operator we can just reference the variable. Also, if we are setting an object property equal to a variable name with the same name we can just list the property name

We will use 1 by default and will use incrementBy value if it is actually passed in. The 1 actually gets used IF there is an object provided and does NOT include incrementBy. If there is no object provided the default will be an empty object {}, and when we try to destructure an empty object we will definitly not have incrementBy we will use the 1



*/

let incrementCount = ({ incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    incrementBy
});