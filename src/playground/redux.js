/*

Redux is a library that makes it possible more complex state with large programs. Can do things similar to how we use component state so far, with state there is some data and that data changes over time and want to make sure the UI is kept up-to-date with that data. Redux allows that.

Component State - vs - Redux:

Both try to solve the same problem - to manage the state/data for your application and how to change the data  (this.setState for Component State), and a way to get data out of that container and render it to the screen (this.state.whateveValueIs for Component State)

Problems with Component State:
1) With complex apps where does the state live? There isnt an overarching parent to communicate state/data to all component trees

2) Creating components sometimes arnt really reusable b/c need spegetti code to tie all together to be able to use components - Need a way for components to interact with application's state (both getting and setting values) without having to manually pass props down the entire comp tree. With Redux it can interact with the global redux state container to get/set values and be truly usable

Will continue to use props, great way to communicate data from parent to child, espeically when child uses the prop/data and actually uses it. Want to Avoid props when passing props down a chain of components just to get it to the last component in the chain 

Redux is a state container, an object. 

*/


/*

-------------  CREATE STORE -----------

Expects CB function as argument to createStore function to set up store right away. Need arguments to CB function:

state: current state 

But do not have a constructor function to set up default so need to set up default in the argument so if there is no state what it should start off at
(state = { count: 0 })
*/





/*
---------- METHODS ON STORE/createStore -----

1) store.getState(): returns current state object

2) store.dispatch(): allows to send action object to store to change (requires type:)
    - returns the action object as well so can access the properties on that object (to remove expenses etc)

3) const unsubscribe = store.subscribe(cb function): pass cb function that gets called everytime the store changes 
    - Return value is what to call to Unsubscribe -> unsubscribe();



*/


// import { createStore } from 'redux';

// const store = createStore((state = {count: 0}) =>{
//     return state;
// });

// console.log(store.getState())

/*
------------- ACTIONS --------------

Actions are how to change the Redux store

Actions: an object that gets sent to the store. Describes the type of action we want to take 

Need to define one property, the action TYPE
{
type: 'INCREMENT'
}

Naming convention is the use all caps for Redux action types with underscores between words 

Use store.dispatch() to send action obejct to store, calling store.dispatch() runs the createStore() function again and can use the action object to make changes to the state. The Action Object gets passed into createStore's CB function as the SECOND ARGUMENT

First argument = state
Second argument = action

const store = createStore((state = {count: 0}, action) =>{
 
Use SWTICH(or IF) statement with action.type and if matches you RETURN a NEW STATE = new object



*/


/*








import { createStore } from 'redux';

const store = createStore((state = {count: 0}, action) =>{

    switch(action.type){
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count  + incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - decrementBy
            };
        case 'SET':
            if(action.count){
                return {
                    count: action.count
                }
            } else {
                throw new Error('must provide count to set')
            }
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() =>{
    console.log(store.getState());
});

store.dispatch({
    type: 'INCREMENT'
});

store.dispatch({
    type:'DECREMENT'
});

store.dispatch({
    type:'DECREMENT'
});


store.dispatch({
    type: 'RESET'
})













/* 

--------- Watching for changes in redux store state ----

store.subscribe(CB Function) will call the CB function everytime the store changes


store.subscribe(() =>{
    console.log(store.getState())
})

Needs to be ABOVE all changes to be in place to watch for changes

Can subscribe to store but can also remove individual subscription. The return value from subscribe 
is a function we can call to unsubscribe so you set the subscribe to a variable to call when want to unsubscribe

const unsubscribe = store.subscribe(() =>{
    console.log(state.getState());
});

store.dispatch({
    type: 'INCREMENT'
});

unsubscribe();







*/
/*




-------  How to pass data with a dispatch - Dynamic information -----

Can pass more information along with the store.dispatch() call, but you need to set it up in the switch case to be able to handle that information being passed in.

You add in another key/value pair in the store.dispatch() call. This is now available to use on the action object, action.key to access the value

You would set up a variable to catch the incrementBy value in the action.incrementBy with a fallback of 1

const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;

This is taking in NO extra values or OPTIONAL values in the dispatch() call 


You can also set up actions that have REQUIRED types by using them directly rather than checking if they exist or not with optional values

store.dispatch({
    type: 'SET',
    count: 101,

})

And then set up in the switch statement that count MUST BE given, can set up to throw custom error if count not given





store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5,
})

store.dispatch({
    type: 'DECREMENT',
    decrementBy: 100,
})

store.dispatch({
    type: 'SET',
    count: 100000000,
})



/*

------------ ACTION GENERATORS ----------------

Functions that return action objects -  

So for all action objects above we can just call a function that returns an action object

One for all increment cases - using increment by or not 

Takes an input and an returns an output that is an object that has the type correctly set

Use a function instead of creating inline action object everytime is if a typo no error will be thrown and it will be skipped but if typo in function all it will throw error 

*/



//  const incrementCount = () => ({ type: 'INCREMENT'})

//  store.dispatch(incrementCount());



/*

---------- How to Accept Dynamic Information with Action Generators ---------



Need to set up the incrementBy on the action object that is returned from the action generator for every single instance of the action when function is called and then use a default value if no information is provided when function is called




*/
/*






import { createStore } from 'redux';



const incrementCount = ( payload = {} ) => ({
    // Implicitly returning an object
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
});


const decrementCount = (payload = {}) =>{
    // Explicitly returning an object
    return {
        type: 'DECREMENT',
        decrementBy: typeof payload.decrementBy === 'number' ? payload.decrementBy : 1
    }
}

const setCount = (payload = {}) => ({
    type: 'SET',
    count: payload.count 
})

const resetCount = () => ({
    type: 'RESET',
    count: 0
})

const store = createStore((state = {count: 0}, action) =>{


    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count  + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            if(action.count){
                return {
                    count: action.count
                }
            } else {
                throw new Error('must provide count to set')
            }
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
});





*/

/*

----- Destrucuring arguments and using default values for arguments -------

First you would take the argument payload and replace it with an object with the property name we want to destructure, incrementBy. This gives us access to the increment by value so we can access it directly so we delete the payload. infront of payload.incrementBy

Then when we destructure we can set up default values. So we add one to { incrementBy } to say, "if increment by exists great but if not use 1"

{ incrementBy = 1 }

This way we would be able to simplify the code even further b/c instead of using a ternary operator we can just reference the variable. Also, if we are setting an object property equal to a variable name with the same name we can just list the property name


We will use 1 by default and will use incrementBy value if it is actually passed in. The 1 actually gets used IF there is an object provided and does NOT include incrementBy. If there is no object provided the default will be an empty object {}, and when we try to destructure an empty object we will definitly not have incrementBy we will use the 1



*/

/*
import { createStore } from 'redux';



const incrementCount = ( { incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    incrementBy
});


const decrementCount = ({ decrementBy = 1 } = {}) =>{
    return {
        type: 'DECREMENT',
        decrementBy: decrementBy
    }
}

const setCount = ({ count }) => ({
    type: 'SET',
    //count: count 
    count
})

const resetCount = () => ({
    type: 'RESET'
})

const store = createStore((state = {count: 0}, action) =>{


    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count  + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
});

const unsubscribe = store.subscribe(() =>{
    console.log(store.getState());
});


store.dispatch(incrementCount());
store.dispatch(incrementCount( {incrementBy: 1000} ));
store.dispatch(decrementCount());
store.dispatch(decrementCount( {decrementBy: 109} ));
store.dispatch(setCount( {count: -109} ));
store.dispatch(resetCount());

unsubscribe();

*/

/*

-------- REDUCER FUNCTIONS -------------

1) Reducers are pure functions
    - Output is fully determined by input - not on global variables
        - Reducers compute the new state based off of old state and action (inputs of reducer function)
    - Anytime function is interacting with something outside of its scope it is NOT a pure function 
    (Dont want to change things outside of function scope AND dont want to rely on things outside of function scope to be a PURE function)

2) Never change state or action through reducer function - only pass in as arguments but never reasign value or mutate - only reading off of them and returning an object that represents the new state
    - If you do find yourself directly changing state or action - step back and ask what you are trying to accomplish
        - Most cases you are just trying to mutate state then you just return it on the new object instead of mutating state directly 
        - state.push(action.newThing) to add to an array use state.CONCAT(action.newThing) to just read off of state or action. Concat will take the state array, and the new thing to add to the array and return a new array with them both, it doesnt change the state at all 



Actions describe that something happend, BUT REDUCERS specify how the applications state changes in response

The action alone doesnt actually do anything, it is the reducer that determines what to do based off of an action - how do we want to change the state 

// Reducers

const countReducer =(state = {count: 0}, action) =>{


    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count  + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

This is the exact same functionality but now we have a seperate reducer to help organize

*/



import { createStore } from 'redux';



const incrementCount = ( { incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    //incrementBy: incrementBy
    incrementBy
});


const decrementCount = ({ decrementBy = 1 } = {}) =>{
    return {
        type: 'DECREMENT',
        decrementBy: decrementBy
    }
}

const setCount = ({ count }) => ({
    type: 'SET',
    //count: count 
    count
})

const resetCount = () => ({
    type: 'RESET'
})

const countReducer = (state = {count: 0}, action) =>{


    switch(action.type){
        case 'INCREMENT':
            return {
                count: state.count  + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
}


const store = createStore(countReducer);

const unsubscribe = store.subscribe(() =>{
    console.log(store.getState());
});


store.dispatch(incrementCount());
store.dispatch(incrementCount( {incrementBy: 1000} ));
store.dispatch(decrementCount());
store.dispatch(decrementCount( {decrementBy: 109} ));
store.dispatch(setCount( {count: -109} ));
store.dispatch(resetCount());

unsubscribe();



/* 

--------------- Expensify App -------------


-------- CombineReducers-------

import { combineReducers } from 'redux'

combineReducers allows you combine reducers to make a single store allowing to break up application into multiple smaller reducers

combineReducers is a function that allows us to create multiple functions that define how a redux application changes to create multiple smaller functions and combine them 

Common to set up reducer for each root property in redux store 


const demoState = {
    expenses: [{
        id: 'ihwqeoijf',
        description: 'January Rent',
        note: 'This was the final payment for that address',
        amount: 54500, // 545.00 in pennies to reduce rounding and compulational errors
        createdAt: 0,
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};



Two big ones expenses and filters - create two reducers 
    1) That just handles the expense array
    2) That just handles the filters object

Then going to combine reducers to create complete store




----- STEPS IN CREATING REDUCER ------

1) Create reducer function
2) Beginning arguments are (state, action)
3) Set up the default state value of the thing you are creating a reducer for
    - For the expenses array of objects itll just be an empty array (state = [], action)
    - Can define default value in line in argument and for empty array/obj thats great but for a more complicated default, you create a global VARIABLE for default value and reference the variable instead 
4) Set up Switch statement to handle different action.type(s) to  Return the new state
5) Create new store w/ const store = createStore(expensesReducer)

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        default: return state
    }
};

const store = createStore(expensesReducer);

console.log(store.getState()) // []

BUT we want that array to live on the expenses property. To set that up we use combineReducers call to store


---- STEPS IN USING combineReducer ------


1) Use as the first argument to create store as a function call
2) combineReducers also takes an argument, an object that has a key/value pair. The key is the root state name and the value is the reducer that manages that
    - With this the default state for the store is an object with a property of expenses and that is where the array lives b/c he goal was to get the array moved off of the store itself and into a property (expenses on the root object)
    - This allows to build more complex redux stores 
    - Rinse and repeat to register all reducers 




const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        default:
            return state;
    };
};


const store = createStore(combineReducer({
    expenses: expensesReducer,
    filters: filtersReducer,
    etc
}));




Need to set up the redux store then set up the action generators to populate the store. Need to destructure the values and set up defaults,



WHERE ARE WE GETTING THE CORRECT VALUES FROM TO DESTRUCTURE THEM??



Need to destructure the first argument, if it doesnt exist need a default as an empty object, need to define what we actually want to grab with the destructured first argument:
    - description = '' (empty string as default if none provided by user)
    - note = '' (empty string as default if none provided by user)
    - amount = 0 (0 as default)
    - createdAt = correct time stamp as default but 0 now



const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0} = {}) =>({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description: description,
        note,
        amount,
        createdAt
    }
});

const unsubscribe = store.subscribe(() =>{
    console.log(store.getState())
})

store.dispatch(addExpense({
    description: "Rent",
    amount: 54500,
}));

AND THEN using the expenses reducer that this action generator is set up for even though it is dispatched to BOTH reducers only set up the 'case' in the correct reducers and the default will catch from the other reducers the dispatch is sent to

When the switch is caught in the correct reducer we want to add the expense to expenses array. The STATE is the array but dont want to change the state/action ever so to add to state's array use state.CONCAT(action.newThing) to just read off of state or action. Concat will take the state array, and the new thing to add to the array and return a new array with them both, it doesnt change the state at all 




const expensesReducer = (state = [], action ) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
                return state.concat(action.expense)
        default:
            return state;
    };
};



*/


/*

------------ SPREAD OPERATOR -----

The spread operator does the same thing as concat so we would return a new array


const expensesReducer = (state = [], action ) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
                return [
                    ...state,
                    action.expense
                ]
        default:
            return state;
    };
};
*/



/* 

Creating the REMOVE_EXPENSE

Since store.dispatch(actionGenerator) returns the action object so we can access the properties on that object (to remove expenses etc)

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 54500 }))

console.log(expenseOne) 

// 
{type: "ADD_EXPENSE", expense: {…}}
expense: {id: "879c6d62-18b9-4521-9375-d5ccef865fdf", description: "Coffee", note: "", amount: 300, createdAt: 0}
type: "ADD_EXPENSE"




Dispatch a call to removeExpense action generator with an object passed in as its argument so we can destructure it in the action generator

store.dispatch(removeExpense({id: expenseOne.expense.id}));

Need the data from above to match the id's so pass it in as an argument but set the default to an empty object 

const removeExpense = (id = {} ) =>({
    type: 'REMOVE_EXPENSE',
    expense: id.id,
});




BUT since there is an object being passed in as the argument you can destructure it to get the 'id' value so we dont need to put id.id, no default required for the id. Then the id value needs to make it on the actual object so we can use it in the reducers 

const removeExpense = ({ id } = {} ) =>({
    type: 'REMOVE_EXPENSE',
    id,
});



Use filter since .filter doesnt change the array it is called on, it just returns a new array with a subset of the values 


        case 'REMOVE_EXPENSE':
            return state.filter(each => each.id !== action.id)



BUT since we just need the ID off of each we could even destructure the each and getting the id

        case 'REMOVE_EXPENSE':
                return state.filter(({ id }) => id !== action.id)


*/



/*

------ USING THE OBJECT SPREAD OPERATOR ------

Start using with EDIT_EXPENSE to override any of the info on an expense (not id)

Going to edit an entry, to do this we need to pass in as arugments:
1) The ID of the expense
2) What we are trying to add or override


store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))


const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


Then handle edit expense with the spread operator.
We want to go through every expense in the array and find the matching id, then change that objects properties to the new properties, and then return a new array with the results - USING .MAP() since map returns a new array populated with the results of calling the CB function on every element of the array

case 'EDIT_EXPENSE':
    return state.map((each) =>{
        if(each.id === action.id){
            return {
                ...each,
                ...action.updates
            }
        } else{
            return each
        }
    })


Once we match the id, we want to grab all existing properties from the existing one, so we are going to spread out each expense ...each , and then update the new properties by spreading out the updates on the action object ...action.updates

And then with the else { return each }, we need this otherwise each entry will be undefined 


*/




/* 

------- Setting up the Filters Reducer -------

Either passing in no value to clear out the filter or a string value to set a filter

store.dispatch(setTextFilter('rent'));
- this set the filters.text value to 'rent'

store.dispatch(setTextFilter());
- this set the filters.text value to ''


const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});


Set up a default so when it is called it will get set to an empty string. Implicityly return an object. Set up type, and text.

Want to return a new object, grabbing all previous values by spreading out the state with ...state, and overriding the text value with the action.text property text: action.text 

  case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }


*/

/* 

Dispatching sort by DATE/AMOUNT



store.dispatch(sortByDate());
store.dispatch(sortByAmount());

const sortByDate = () =>({
    type: 'SORT_BY_DATE'
});

const sortByAmount = ()=>({
    type: 'SORT_BY_AMOUNT'
});


       case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
*/




/*

Dispatching start/end date

Want the value passed into dispatch to end up in the startDate filters and call it empty to clear it 

store.dispatch((setStartDate(125)));
store.dispatch((setEndDate(525)));

No need for default value since undefined is already the default 

const setStartDate = (startDate) =>({
    type:'SET_START_DATE',
    startDate
})

const setEndDate = (endDate) =>({
    type:'SET_END_DATE',
    endDate
})

  case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
*/




/*

-------- FILTERING REDUX DATA --------

At this point we have two seperate pieces of data, the expenses array and the filters object but not using the two together to filter what should be shown to the screen 

Going to pass the data into a single function, it will filter and sort the data returning the visible expenses 

// Get visible Expenses

const getVisibleExpenses = (expenses, filters) =>{
    return expenses
};





Need to destructure the filters to pull out variables from filters to use, and use .filter to return a subsect of the expenses array using the filters. Create three const to store whether or not they were matches` startDateMatch; endDateMatch; textMatch; -- if all three of these are true than we have a complete match and want to return true from filter and the item will be kept in the array and if ANY of them are false then it will be kicked out


const getVisibleExpenses = (expenses, {  text, sortBy, startDate, endDate }) =>{
    return expenses.filter((each) =>{
        const startDateMatch;
        const endDateMatch;
        const textMatch;

        return startDateMatch && endDateMatch && textMatch;
    })
};


-------- TIMESTAMPS TO USE WITH START/ENDDATEMATCH ----------

Timestamps are counting in milliseconds using unix epoch time (jan 1 1970) for timezone independant 


Checking the typeof startDate if it !== 'number' this is going to be true which is ok b/c if it is undefined we arnt going to take it into acct for filtering which means it will always be true for non-numbers, only if start date is a number do we actually want to filter out expenses, so OR expense.createdAt >= startDate;

dummy data for startDate:

- startDate = undefined and createdAt = 1 // Not === to a number so it is TRUE and item wont be filtered 

- startDate = 2 and createdAt = 1 // Is a number so the OR will run and expense.createdAt (1) IS NOT greater than the startDate (2) so it will get filtered out


const getVisibleExpenses = (expenses, {  text, sortBy, startDate, endDate }) =>{
    return expenses.filter((each) =>{
        const startDateMatch = typeof !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof !== 'number' || expense.createdAt <= endDate;
        const textMatch =  each.description.toLowerCase().includes(text.toLowerCase()); 

        return startDateMatch && endDateMatch && textMatch;
    })
};



const unsubscribe = store.subscribe(() =>{ 
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    
})



*/

/* 
-------- SORT BY DATE OR AMOUNT --------

Using arr.sort() with a compare function (a,b) by CHAINING the sort call onto the .filter call


const getVisibleExpenses = (expenses, {  text, sortBy, startDate, endDate }) =>{
    return expenses.filter((each) =>{
        const startDateMatch = typeof startDate !== 'number' || each.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || each.createdAt <= endDate;
        const textMatch = each.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) =>{
        if(sortBy === 'date'){
            return a.createdAt > b.createdAt ? 1 : -1
        } else if(sortBy ==='amount'){
            return a.amount > b.amount ? 1 : -1
        }
    })
};

*/



/*

------ BREAKING OUT INTO SEPERATE FILES FOR EASY SCALING ------------


Going to set everything up in their respective folders. Only change will be that we put the store creation in a function call to be able to access it as the default export of the file


export default () => {
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    }));
    return store
}


In app.js going to import and set up a store

import configureStore from 'localPath'

cosnt store = configureStore();

console.log(store.getState()) // default state of store




*/




/*

---------- HIGHER ORDER COMPONENTS (HOC) --------

A pattern

A regular React component that renders another component

HOC --> RENDERS --> Regular Component (can be multiple rendered by HOC)

The goal of HOC is to:

- Reuse Code: if you want to show something over a multitiude of pages 
- Render Hijacking
- Prop Manipulation
- Abstract State


Creating a HOC pattern for a medical app to add an admin warning at the top of sensitive pages 

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

ReactDOM.render(<Info info = 'poop'/>, document.getElementById('app'));



Steps:

1) Create a regular function, and this gets called with the component(s) we want to wrap. Can call with any amount of components we want to wrap -- withAdminWarning
    - What we get back is the alt version of the component - the higher order component so we get that back in a variable we name from calling the function -- AdminInfo
    - inside function: return the HOC component with a returned stateless functional component
    - Add all of the information we want to, and then create an instance of the component being passed in - now WrappedComponent = HOC
2) Instead of rendering <Info/> we render the HOC <AdminInfo/>
3) Pass in/Render props with spread operator: when have an instance of a component in JSX can add a javascript expression and can spread out any object we want {...props}
    - this has the effect of taking every key/value pair on that object and passing them down as props, thus being able to use them normally in the original to-be-wrapped component 


    
const withAdminWarning = (WrappedComponent) =>{
    return (props) => (
        <div>
            <p>This is private information, please do not share!</p>
            <WrappedComponent {...props} />
        
        </div>
    );
};

const AdminInfo = withAdminWarning(Info)


ReactDOM.render(<AdminInfo info = 'poop'/>, document.getElementById('app'));



Can actually take this one step further by passing a special prop into the HOC, maybe want to know whether we should show the message so need to know if admin, so create a prop:
isAdmin = true/false

The idAdmin prop is getting passed into the component, and will use the logical and operator to render a message if the isAdmin = {true}



const withAdminWarning = (WrappedComponent) =>{
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private information, please do not share!</p> }
            <WrappedComponent {...props} />
        
        </div>
    );
};

ReactDOM.render(<AdminInfo isAdmin = {true} info = 'poop'/>, document.getElementById('app'));

By adding new props onto the component we create one that is even more resuable and versitile. Can also pass things like isAdmin down so we can create brand new props that we pass down to the Info component and Info can use them if they like

Will see this pattern extensivly with React-Redux library - they will give use a function like withAdminWarning - will pass our components inside of them and the end result is a brand new component that we are going to be using and the new component WILL HAVE ACCESS TO THE REDUX STORE!!

This pattern allows us to modify and change a series of existing components without having to rewrite the withAdminWarning code for each component - instead it is abstracted away and we are able to use this as often as we need 

*/


const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The private info is: {props.privateInfo}</p>
        <p>The public info is: {props.publicInfo}</p>
    </div>
);


const withAdminWarning = (WrappedComponent) =>{
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private information, please do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
}

const AdminInfo = withAdminWarning(Info)

ReactDOM.render(<AdminInfo isAdmin = {true} privateInfo = 'This is the private information' publicInfo = 'Public Info'/>, document.getElementById('app'));





/* 

------------------- CONNECTING REACT AND REDUX -------------

By connecting them we create "connected componenets" (react component connected to redux store). By doing this the components can:

1) Fetch data from store so can render something to screen 
    - When data that is being fetched changes there will be an auto rerender 
     
2) Dispatch actions directly from React Components
    - Someone can fill out a form and submit the dispatch using React Components 


Need to install React-Redux (yarn add react-redux) which is a library that allows us to connect redux store's to react components. This makes heavy use of a pattern known as HIGHER ORDER COMPONENTS

There are TWO things we need from the library a single component and a single function:



Use PROVIDER component once at the root of project 

Use CONNECT for every single component to connect to redux store 

Need to import { Provider } from 'react-redux'

- Provider: allows us to provide the store to all components (so dont need to manually pass store around)
    - Open/Close <Provider> tag and place the rest of the application inside of the tag which is in the {AppRouter} variable inbetween 
    - Provider NEEDS a single prop (store) which is the store we want to share with the app and set equal to redux store

const store = configureStore();

const jsx = (
    <Provider store={store}>{AppRouter}</Provider> 
);

ReactDOM.render(jsx, document.getElementById('app'))


NOW all components do have access to the store, now we can use the CONNECT fuction to create components that get info from the store 

Create a new file expenseList.js that will export a stateless functional comp with all of the expenses listed that will be exported to the expense dashboard. 

Need to import { connect } into expenseDashboard 

Will be using the connect function in all indivudal componenets that need store access, now focusing on reading from the store and getting expenses showing up. Steps:

1) Create HOC: for connected comp use Connected in front of name for function name (ConnectedExpenseList)
    - Set equal to calling connect()(ExpenseList); -- What we get back from that call from the API is the actual function so then we need to chain on another function call with the component we want Connected
        - Inside the connect() argument we provide the info of what we want to connect usually just a subset of the store and not the whole store so we define a CB function to determine what info from the store we want the component to be able to access.
            - The store's STATE is passed in as first argument of CB function, and then return an object with any key/value pairs we want
            - Set up a key (expenses) and value will be state.expenses
        - Export ConnectedExpenseList instead of ExpenseList
        - Refactor: export ConnectedExpenseList as default without a variable, set up a variable for CB function commonly called mapStateToProps, so have regular unconnected component, some functions to perform stuff, and then a call to connect() to pull it all together
        - When connect a component to Redux store it is reactive = As store changes mapStateToProps will auto rerun and render new info 
            - This is used instead of store.subscribe or store.getState

-------------REFACTOR FROM----------------------
const ConnectedExpenseList = connect((state) =>{ return {expenses: state.expenses}})(ExpenseList)
export Default ConnectedExpenseList

-------------REFACTOR TO----------------------
const mapStateToProps = (state) =>{ return {expenses: state.expenses}}
export Default connect(mapStateToProps)(ExpenseList)




/*


------------ HOW TO GET INDIVIDUAL EXPENSES RENDERING ------------

Each individual expense and its description can be an instance of another component, so we can make another component to extrapolate the data from each expense and then pass it to ExpenseList to render it. Can just return the data needed in ExpenseList but it gets spegetti and might as well use another component.

Set up new file and component ExpenseListItem, and default export it and import.
    - Here we structure what we want each expense to look like by setting up stateless functional component, and destructuring its argument with what we want to pull off of each expense. We can also use props as argument and pull data using props.expense.description/props.expense.amount
    - Then inside the component set up the structure inside the wrapper <div>

Now ExpenseList will use .map() on each expense that is being passed into it from the props set up by mapStoreToProps function.
    -.map() let you take in an array of something (objects) and get back an array of something else (intances of expense list item)
    - call map with each expense as argument and IMPLICITLY return an instance of ExpenseListItem PASSING IN PROPS. Can use normal props structure (expense={expense}) OR can use spread operator to spread out all of the properties on expense {...expense}
    - need to also set up the unique key identifyer with expense.id key={expense.id}

BUT ALL EXPENSES STILL RENDERING since we are getting our list of expenses in mapStoreToProps from the full list of expenses not the filtered list
------- GETTING EXPENSES: FROM STATE.EXPENSES ----
const mapStoreToProps = (state) =>{
    return {
        expenses: state.expenses,
    };
};


So we need to set the expenses property to the return value of the SELECTORS we set up by:
------ GETTING CORRECTLY FILTERED EXPENSES USING SELECTOR --------
import getVisibleExpenses from '../selectors/expenses'
const mapStoreToProps = (state) =>{
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters),
    };
};


*/




/*

------------ SETTING UP UI INPUTS FOR EXPENSE TEXT FILTER --------

Need to set up another component for the UI for expense list text filter. 

Set up an <input type="text"/> in the new component ExpenseListFilters and import/export it to expenseDashboard to render. 

Need to get the text value off of store which is set in app.js by:
store.dispatch(setTextFilter(filter))

And have the input always match up with the value on the Redux store and the changes via dispatch call. So need to CONNECT expenseListFilters to the store.

1) import { connect } from 'react-redux'
2) export default connect(mapStoreToProps)(ExpenseListFilters)
3) Create const mapStoreToProps = (state) =>{return {filters:state.filters}}
4) Pass in props to ExpenseListFilters
        const ExpenseListFilters = (props) => (
            <div>
                <h3>{props.filters.text}</h3>
            </div>
        );
5) Add value and connect to props.filters.text <input type="text" value={props.filters.text}/>
    - This renders a read-only field as value prop is provided without onChange
    - We are not just setting the initial value - we can do this with the defaultValue property
        - <input type="text" defaultValue={props.filters.text}/>
6) Provide an onChange handeler with a CB to actually change the redux store with a dispatch call
    - When we connect a component to Redux we get other information passed into the component as well (can see with React Dev Tools)
    - dispatch() is passed into the connected component - this is the same dispatch() accessed on the store so we have access to dispatch inside connected component so we can call it directly to dispatch actions. It is stored on the props argument
    - Set up the dispatch to use setTextFilter on the action generator we defined in ..actions/filters so we need to import { setTextFilter } from '../actions/filters';
         <input type='text' placeholder={props.filters.text} value={props.filters.text} onChange={(e) =>{
            props.dispatch(setTextFilter(e.target.value))
            }}/>

We still need the value input for <input>, <textarea>, and <select>. By providing the value we make the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”. Without the value property it will be an uncontrolled component


*/



/*
---------------   SET UP ABILITY TO REMOVE AN EXPENSE ON EXPENSE LIST ON DASHBOARD -------


Set up remove button that will dispatch an action when clicked.

When we use connect we do not need to take anything from the state. So no mapStateToProps is not needed. We can just call it and connect it to the component to be able to get access to the DISPATCH call!! It will live in the props which can be destructured 
connect()(ExpenseListFilters)

1) import { connect } from 'react-redux' AND import { removeExpense } from '../actions/expenses';
2) Add dispatch and id to the destructured arguments to grab the dispatch and id props from the expense object 
3) Set up a button to display on each expense
4) Set up an onClick handler to call removeExpense when clicked
       <button id= {id} onClick={(e) => {
           console.log(e.target.id)
           dispatch(removeExpense({ id:id }))
        }}>Remove</button>
    - We set up removeExpense to take an OBJECT (not a destructured argument) with the property id so we need to pass in an object with an id property set to the id of the expense that the button lives on
    
    - We can refactor dispatch(removeExpense({ id:id })) to the ES6 Object Definition shorthand if key/value are the same can just provide one
        dispatch(removeExpense({ id }))


5) Change export default connect()(ExpenseListFilters)


The Data still comes back so it is not persisted yet when you delete it

*/


/*
-------- DROPDOWN TO PICK SORTBY FILTER -----

1) import { sortByDate, sortByAmount } from '../actions/filters';
2) Set up a label(optional), the select tag which onChange will live, and the option tags for the dropdown options, and set each select tags value to date/amount
3) Set up value prop on select to be a controlled component. The value comes from props.filters.sortBy
4) Set up onChange to call sortByDate if e.target.value is date or vice versa


When setting up form inputs like text inputs, and select inputs, drop downs. When we use value= and onChange= , we are creating as a controlled input. This just means an input where the value is controlled by JS. The alternative is like the form field in the indecision application. Sticking with controlled inputs when can, gives more control which we will use later 

*/


/*
----------- ADDING ADD AND EDIT EXPENSE PAGE IN UI -----

The component for Add/Edit is going to be the same so we are not going to add a lot of complexity to the createExpense page we are going to create a component with all of that and just render it to the page, and render the same compoenent in editExpense 

1) Create new component expenseForm.js
2) Create a new Class based component b/c going to use component state and set up a render() method
    class ExpenseForm extends React.Component {
        render(){
            <div>Meow</div>
        }
    }
3) Build out inputs needed - description, amount, note (not createdAt b/c not user given)
4) Create one overacrching <form> tag and put two <input> with type(text/number), placeholder, and autofocus on first input, and <textarea> for note, and <button> to submit
                <form>
                    <input type="text" placeholder="Description" autoFocus/>
                    <input type="number" placeholder="Amount"/>
                    <textarea type="text" placeholder="Add a note (optional)"></textarea>
                    <button>Add Expense</button>
                </form>



(Big picture goal is to use local component state to track the changes to all of the inputs, only when the user submits the form will we send it off to redux store to edit existing expense or create new one, so using local componenet state AND redux. Pretty sure we need to use both b/c this is going to be for the edit component as well so we can track the local changes that get pulled from the redux store when we go to edit something )


5) DESCRIPTION: Set up the state object on the class to use the local component state, and put description on it and default will be an empty string - this is the only thing we will require user to actually change as number will start at zero which they can use and the note is optional
    A) Set the value for the description input to the current state value (if just put value it will be read-only) and onChange 
    
        state = {description: ''};
        <input type="text" placeholder="Description" autoFocus value = {this.state.description} onChange={this.onDescriptionChange}/>

    B) Set up method onDescriptionChange, pass in eventObj, create description variable, and then use this.setState(). Pass in the updater function that implicitly returns an object that sets description to the description variable so can use ES6 Obj Shorthand
        onDescriptionChange = (e) =>{
            const description = e.target.value;
            this.setState(()=>({ description }));
        };

            (Need to create description variable b/c stores the value b/c CB isnt called right away, you can use e.persist() and set description: e.target.value after you call e.persist() above it )
        Now you can change the value of description, and know that it is setting the local component state 


6) NOTE: Do the exact same process for Note 
7) AMOUNT: Going to limit to just numbers and allow for a decimal place and enforce how many digits after decmial. Need to use conditional logic on onChange. Without that you can add as many digits after the decimal as you want - at most two after decimal
        A) Switch type="number" to type="text" and add own validation code with regex
        B) Set up default state for amount as empty string '', and use that as the value
        C) Set up onChange to new method onAmountChange that pulls the (e) and NOT blindly set it, add if statement to setState(())
        D) The IF statement using string.match(regex) method. This will only allow the correct input instead of checking the inputs later and throwing an error if there is one

        onAmountChange = (e) =>{
            const amount = e.target.value;
            if(amount.match(/^\d*(\.\d{0,2})?$/g)){
                this.setState(()=>({ amount }))
            }
        }

*/



/*
------- SETTING THE CREATEDATE VALUE WITH A DATE PICKER ---------

Will use calendar picker to add the day of the expense, this allows someone to add an expense to the past. Using two different libraries
1) Moment JS: time library make it easy to work with and manipulate time and present time - time utility library
    - yarn add moment@latest
2) Airbnb React Dates: Opensource to easily drop a calander picker into the application - requires moment()
    - Single Date Picker (SDP) and not the range dates picker 
    - yarn add react-dates@latest react-addons-shallow-compare@latest

Will use Moment to get react dates library up and running 
- will create a new moment() and pass it in. this is how react-dates get populated with initial day
- and then work with moment() and user interacts with calandar and pick a day we get that day back so need to work with moment objects generated by other libraries 

import moment from'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('MMM, Do, YYYY'))

Need there are props that are REQUIRED to use react-dates. 
For date, need to show the current date, so we need to add a new property to the local component state createdAt: moment()
For onDateChange, this expects a function created with a moment instance when someone picks a new day from the calander.
    - The function is called with the moment passed in as the argument so call it createdAt b/c that is what the date represents for me 
    - Need to use this.setState(). Setting the state for createdAt. this.setState will have CB that implicitly returns an object that sets createdAt: equal to createdAt so use ES6 object shorthand
        onDateChange = (createdAt) => { this.setState(() => ({ createdAt })}
        To prevent the UI from being able to totally clear the calendar value we put it in an if statement, if there is a value for createdAt
        onDateChange = (createdAt) => { if(createdAt){this.setState(() => ({ createdAt })}}

(Focused/onFocusChange is exacly the same - provide value in focus and the handeler in onFocusChange)
- Focus needs a new property to local state as a boolean, set it up initially as NOT focused - calanderFocused: false. Need to pass that value down into focused = {this.state.calanderFocused}
- onFocusChange: also need to provide a handeler so set it to a method onFocusChange={this.onFocusChange}
    - onFocusChange - first argument is an object that is destructured and grabbing the focused property and setting that on the state by using this.setState() passing in the updator function where we implicitly return an object where we are setting the property we set up calanderFocused equal to whatever value comes back from focused 

    just (focused) as the argument is {focused: true} so we need to destructure to get just true and not the whole object b/c the focused value is coming from the props on SingleDatePicker 

    onFocusChange = (focused) => {this.setState()=>({calanderFocused: focused.focused})} is the same as:    
    onFocusChange = ({ focused } => {this.setState()=>({calanderFocused: focused})}

<SingleDatePicker
  date = {this.state.createdAt}
  onDateChange = {this.onDateChange}
  focused = {this.state.calanderFocused}
  onFocusChange= {this.onFocusChange}
 
/>

UPDATE: NEED TO RUN npx install-peerdeps react-dates TO NOT GET ERROR CODE FOR REACT V17 - this will downgrade ReactV16.1.1
yarn add react-dates@21.8.0 @babel/runtime@^7.0.0 moment@^2.18.1 react@^16.1.1 react-dom@^16.1.1 react-with-direction@^1.3.1
Still get an error message so i reinstalled react/reactdom V 17

- How to change how many dates get shown with prop: numberOfMonths = {1}
- Able to choose past dates with prop: isOutsideRange = {(day)=>{}}
    - The function takes the day in question in as the argument and allows us to dynamically calculate whether day should be available or not - this would be nice if have a complex set of logic like with a lodging application and only want to show days with vacancy but we dont care we always want it to be availble so we just return false
        isOutsideRange = {(day) => false}

*/


/*
----------------------------- WIRING UP ADD EXPENSE -------------------------

On the form, we add an onSubmit={this.onSubmit} property, and create the .

1)  We have to create a new property on the state to track the error state, if there is an error populate the error with a error string and if not then clear the this.state.error's value
state = {error: ''}
2) Create function onSubmit function that preventsDefault reloading of page and checks if there are both a description and an amount. IF not populate the this.state.error into an error message and clear it when its ok

-- (BELOW DOES NOT WORK B/C IT SETS THE ERROR STATE BUT DOES NOT TRIGGER A REFRESH) ---
onSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=>{ this.state.error = 'Please provide Description and Amount' })
        } else{
            this.setState(()=>{ this.state.error = '' })
            console.log('sdf')
        }
    }

--- (NEED TO RETURN AN OBJECT THAT IS CONNECTED TO THE STATE TO TRIGGER A REFRESH) ---
    onSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=> ({error: 'Please provide Description and Amount'}))
        } else{
            this.setState(()=> ({error: ''}))
            console.log('sdf')
        }
    }
3) Add conditional rendering for the error message : {this.state.error && <p>{this.state.error}</p>}

4) Now need to actually dispatch the action of submitting. That is NOT going to happen in expenseForm since we want it to be reused for adding and editing, and we need to dispatch different stuff depening on what we are doing. So we need to pass the data up to createExpense and editExpense components to determine what to do when user submits dynamically whether to dispatch add or edit expense. So need to add a prop on the ExpenseForm instance in CreateExpensePage which will be a function - onSubmit() that gets called when the form gets submitted. We then would get the data back which would be the expense object with all of its properties as a prop to ExpenseForm so we can then use it in ExpenseForm
    A) Create a NEW onSubmit() function that will be passed down as a prop from CreateExpensePage to ExpenseForm that will receive the expense information passed up as an object that we are defining as expense. We call this new onSubmit() function in ExpenseForm in the FIRST onSubmit() function when we submit valid data that doesnt throw an error. We use this.props.onSubmit to acess this function. We wired it so this new onSubmit() is waiting for an object (expense) that gets passed in when it is called in the ExpenseForm so when we call it we pass in an object with all of the properties that an expense is made up of that is stored in the local state component. So we create and object that we call the argumnet with the properties
        1) Description as -> description: this.state.description
        2) Amount is a string so needs to be parsed to an integer using parseFloat so the decimals stay in place, and since working in pennies we multipy it by 100 -> amount: parseFloat(this.state.amount) * 100
        3) CreatedAt: this needs parsing b/c it is currently a moment object so need to use a moment method .valueOf() to get in unix milliseconds so valid JS -> createdAt: this.state.createdAt.valueOf()
        4) Note as -> note: this.state.note

const CreateExpensePage = () => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit= {(expense) => {console.log(expense)}}
            />
    </div>
);

onSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=> ({error: 'Please provide Description and Amount'}));
        } else{
            this.setState(()=> ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf(),
            })
        }
    }

5) Now the createExpense component needs to be able to dispatch the addExpense action to the Redux store
    A) import { connect } from 'react-redux';
    B) change export default connect()(CreateExpensePage)
        - Not passing in anything to connect b/c dont need anything from the state at all just need dispatch
    C) Pass in (props) as argument to CreateExpensePage
    D) Change onSubmit to dispatch addExpense passing in expense object
    onSubmit = {(expense) => { 
                props.dispatch(addExpense(expense))
            }}

6) Automate redirect onSubmit(). The components we render inside React.Router get access to a few special props (can see in reactdevtool in component CreateExpense). Access to history, location, match, etc. Will use a history method PUSH(). Push() is how we programatically change pages
    A) Add props.history.push(path) into the onSubmit prop
    <ExpenseForm
            onSubmit = {(expense) => { 
                props.dispatch(addExpense(expense))
                props.history.push('/')
            }}/>


Passed the data out of expense form by calling a prop onSubmit() that gets passed in from the parent (CreateExpensePage). We did this b/c we want to reuse expense form on both createExpense AND editExpense. Instead of dispatching straight from expenseForm we passed the information up to CreateExpensePage and dispatched from there to reuse component. Since add and edit are going to use different actions we have abstracted that away from expenseForm and passed it up 


*/

/*
----------------------------- WIRING UP EDIT EXPENSE -------------------------

Need to make a change to expenseForm state properties. B/c createExpense is ok with empty string defaults. but with edit it needs to be able to provide the current values for that expense. To do this we need to set up one prop that gets passed into expenseForm, itll be optional, if it exists we will use the values from that expense, and if not we use defaults

1) Actually link over to editExpense page - to visit the url needs /edit/id at the end of it. Need to wrap the desctipion in a LINK tag to use client side routing to go over to that expense's page
    A) import {Link} from 'react-router-dom' on expenseListItem component 
    B) Wrap the description h4 in a link tag with the property to= set to a template string `/edit/${id}`
    <Link to={`/edit/${id}`}><h3>Description: {description}</h3></Link>
2) Connect the editExpense component to the redux store
    A) import { connect } from 'react-redux';
    B) Need a mapStateToProps function b.c we need to give the compoenent the current expense object 

    const mapStoreToProps = (state) =>({
        expenses: state.expenses,
    });
    export default connect(mapStoreToProps)(EditExpensePage)
3) Now since the expenses are passed up to EditExpensePage as props we use the .find() method to return the expense that matches the id to the props.match.params.id
        const match = props.expenses.find((each)=> each.id === props.match.params.id)
4) Render expenseForm in the editExpense page
    A) import expense form and create an instance of it inside the <div>
    B) Pass in the match prop AND an onSubmit prop to handle what is done when we finally submit an edited expense
5) Since we cannot access the props in the expenseForm to conditionally fill in the fields if we are editing we need to switch the state object from the experimental type to the regular to the contructor function type so we can pass in props 
    A) From:
           state = {
        description: '',
        note: '',
        amount: '',
        createdAt: moment(),
        calandarFocused: false,
        error: '',
    };
    
    TO: 

     constructor(props){ 
      super(props);
        this.state = {
            description: props.match ? props.match.description : '',
            note: props.match ? props.match.note : '',
            amount: props.match ? (props.match.amount / 100).toString() : '',
            createdAt: props.match ? moment(props.match.createdAt) : moment(),
            calandarFocused: false,
            error: '',
        } 
    }
    B) The amount gets parsed to a string and divided by 100 b/c stored in pennies
    C) createdAt gets a moment() with the timestamp passed in as the argument if there is one 

6) Need to wire up onSubmit() so the changes stick to the edited expense. To do this we need to pass in the match.id and expense object to dispatch.editExpense needs the expense.id to be able to match up the correct expense in the expense array and update its information
    A) Now we can dispatch the editExpense action on the expenseForm onSubmit() in the editExpense compoenent
            props.dispatch(editExpense(match.id, expense))
            props.history.push('/')


*/



 

/*
-------------- REDUX DEVELOPER TOOLS --------------


1) Google redux developer tools extention for useage and stuff
2) Need to install extention to browser 
3) Need to change the code when the store is set up and pass in the new line of code as the SECOND argumnet to createStore after combine reducers
FROM:
export default () => {
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
    }));
    return store
}

TO:
export default () => {
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
        })
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store
}



*/


/*

-------------- FILTERING BY DATE ---------------

The ability to pick a start date and an end date to get expenses between those days 

Want to deffault to just showing the expenses from the current month, so need to change the filters.js reducer to have the start date as the beginning of the current month and same for end date.
1) import moment from 'moment';
2) change start/end date to be moment() instances for start and end of the month
    A) Can use .startOf and end.Of() to go to the start of year/month/quarter/week etc
        1) startDate: moment().startOf('month') endDate: moment().endOf('month')
3) Need to import everything needed for react-dates and range picker but since we need to track the state of focusedInput and onFocusChange we are going to switch the ExpenseListFilters to a class based component to be able to use state
    A) Take all JSX and put it in the render() call in the new class based component
    B) Add a state object that we are going to track the same thing as the other instance of this calander, but we are initally setting it to null, it will change to a string if we are focused on the two calanders or the second. dont need to do anything with this just pass it down into the react dates component
        state = {calanderFocused: null}
    C) Need to change all of the props.filters.text things over to this.props.filters.text
4) Start setting up the nessesary properties on DateRangePicker
    A) startDate & endDate: already have these and it is being passed in as a prop from the mapStoreToProp()
         startDate={this.props.filters.startDate} endDate={this.props.filters.endDate} 
    B) onDatesChange: define a method above and call it. The method will be called by the react-dates library. IT will be called with an object that has a startDate and endDate, so we destructure the object passed in and grab both startDate and endDate. Now we need to dispatch the correct actions to get the filters to change, which we already have in setStartDate and setEndDate. All need to do is use dispatch setStartDate passing in the new start date 
            onDatesChange =({ startDate, endDate }) => {
                this.props.dispatch(setStartDate(startDate));
                this.props.dispatch(setEndDate(endDate));
            }
    C) focusedInput: this is where the new state comes into play. Set its value from {this.state.calanderFocused} this needs a change handler
    D) onFocusChange: this is the change handler. All this does is get the focus value and sets it. Create method and provide argument which is the new value and just sets it. Can call the new value the same so we can ES6 object shorthand. Then call a setState call passing in updater function and implicity return object, this just sets calanderFocused to the new value passed in as the argumnet
5) Add the other properties not needed but wanted on DateRangePicker      isOutsideRange = {(day)=>false} numberOfMonths = {1}
6) Need to make the filtering actually work, so we have to go into our expenses selctor and refactor two lines b/c we are using <=/>= which no longer works so we are going to use moment methods 
    A) Need a way to make the comparisons with moment, the Query methods for moment, is one before another, after another -- .isBefore() etc.
    Need to refactor using a ternary since user can delete all dates to see all expenses, we check if there is a startDate, if there is NOT one we return true so all expenses will show, and if there IS one we check if we want to show it by seeing if the calender startDate is before the createdAt timestamp of the expense

    FROM:
    const startDateMatch = typeof startDate !== 'number' || each.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || each.createdAt <= endDate;
    TO:
        const createdAtMoment = moment(each.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment) : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment) : true;

*/




/*
---------------- TESTING APPLICATIONS WITH JEST-----------------

Setting up automated test suite to test React components.

Write test cases = functions designed to test the React compoenents 

The goal of setting up automated test suite is to prevent human error in checking oursevles and as app grows it takes more time for humans to test everything. That if I set up a component somewhere it isnt effecting something else elsewhere. Dont have time to check every feature or edge case if we want to make small changes here and there

Using JEST as the test framework, released by FB and integrates (jasmine, mocha is node and karma is angular) best with React apps.

.test.js files are run through babel so we are able to use all babel features

1) Install: yarn add jest
    - Not imported, more like webPack using it from CL, installed locally (b/c global is bad practice) and setting up a script for it in package.json -     "test": "jest", since a popular name can just be yarn test or yarn run test
2) Define test cases, create new test folder in src folder and file with .test.js extention!
    - Get access to a set of Global variables that Jest gives to us that allow us to construct the test cases (live in docs)
    - Most important is test() which lets us set up a new test case, call it inside test file and pass in two required arguments
        1) Name - A string
        2) Code to run for test case - An arrow function
            A) Inside this arrow function we define an ASSERTION, first we define a variable and call the function we are testing. Use Jest methods to judge:
            expect() and toBe(): expect(result).toBe(7)
        TONs of uses of expect() and other methods in the docs


How to run in watch mode: 

yarn run test --watch OR yarn test --watch

Do not add to script b/c something just want one test and not a watching test
*/


/*
--------- TESTING EXPENSES ACTION GENERATORS --------------

1) Clone each folder in src file to tests folder and set up the test file in each folder 
    - actions folder into tests folder and then create the companion test file. Same name of file just with .test.js exention at the end of it - expenses.test.js
2) import the functions needed to test: import { addExpense, editExpense, removeExpense } from '../../actions/expenses'
3) Call functions and assert something about the return value of it 
    A) removeExpense:
        1) Call test, setup name(string), setup function with a variable(action) to store the returned action object, set its value to what comes back from removeExpense, and call removeExpense with nessesary argument, it is expecting an object with a property of id and value of anything 

        test('should setup remove expense action object', () ={ const action = removeExpense({ id: '123abc'})})

        2) Now assert something about the action of the above call using expect(action).toBe(). We pass in the object we are expecting to get back - expect to have a property type:'REMOVE_EXPENSE' - and property id: '123abc'
            - BUT WE CANNOT USE .TOBE() b/c is compares using === and two objects/arrays with never === , so need to check the properties on those objects to see if theyre all equal to eachother, so need to use .toEqual() to iterate over all properties to make sure they are the same

            test('should setup remove expense action object', () ={ 
                const action = removeExpense({ id: '123abc'})
                expect(action).toEqual({type:'REMOVE_EXPENSE', id: '123abc'})
            })

    B) editExpense: it expects id passed in as a variable, and the updates passed in as an object
        1) Same as removeExpense but the update object passed in on the action is then a nested object added as a property with the key as updates and the values as the updates that were passed in

                    
        test('should setup edit expense action object', () =>{
            const action = editExpense('abc123', {
                amount: 'updated amount',
                note: 'updated note',
            });
            expect(action).toEqual({
                type: 'EDIT_EXPENSE',
                id: 'abc123',
                updates: {
                    amount: 'updated amount',
                    note: 'updated note',
                }
                
            })
        })

    C) addExpense: needs two for the default values and then when values are provided by user:
        1) provided value: this is mostly the same but the id: value is always dynamic and will change every time so need to use a function that expect gives us access to expect.any(String) - this allows up to just assert something about the type(obj, boolean, array, string), here all we care about is that its a string
        Can use the spread operator here to spread out expenseData 

                    test('should setup add expense action object with provided values', () =>{
                    const expenseData = {
                        description: 'test',
                        amount: 0,
                        note:"test",
                        createdAt: 0
                    }
                    
                    const action = addExpense(expenseData)

                    expect(action).toEqual({
                        type: 'ADD_EXPENSE',
                        expense: {
                        ...expenseData,
                        id: expect.any(String)
                        }
                    });
                });

        2) Default value is the same as above but the expense will have the deafult properties

Objects / Arrays - use .toEqual()
Booleans / Numbers / Strings - use .toBe()


The filters is exactly the same as this but you need to import and use moment b.c we need to test with the same type of information that we are passing in


*/


/*

------------- CREATING A TEST CASE FOR EXPENSES SELECTOR -------------

This is some of the most complicated code we have, need to make around 6-7 test cases to make sure all paths are working as expected

1) Create folder/file and import the function 
2) Need to set up a test case to call selectExpenses with the correct information it is expecting: an array of expense objects, and the filters object with different properties given
    - Need to create a global array of test data, an array of expense objects to pass in
3) Need to create a test case for each type of filtering that we can do, text/date/amount/startDate/endDate
    - Each test case will have different filters so we will keep the filters object function scoped.

4) Set up for Text Filter: 
    A) Create filter object with text property to test the array of expense objects with, and the default values for everything else: 
     const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    B) Set up assertion with what should come back, an array of only the objects with an 'e' in the name with the most recent date on top since it still is being filtered by date as well
        expect(results).toEqual([expenses[2], expenses[1]])

5) Set up for startDate Filter:
    A) Create new filter object with startDate: as an instance of moment since that is what is usually passed in, and also need to make sure the dummy data is at least seperated by a few days:   createdAt: moment(0).subtract(4, 'days').valueOf() //  createdAt: moment(0).add(4, 'days').valueOf()
        - Set the value of startDate as an instance of moment(0)

    B) Set up an assertion 
                
*/


/*

=----------- CREATING TEST CASES FOR FILTERS/EXPENSES REDUCERS -----------------=

All to do is the call the function with different values with a state and n action

The first test case is the one that makes sure the default value use gets set up correctly when the redux store first gets kicked off. Redux dispatches a special action for that and can see it in the Redux Dev Tools. It initially dispatchs:
@@INIT : it is just a single object with its type set to @@INIT {type: @@INIT}

That is what we are going to be dispatching to test the defaults, this is used interally by redux, never actually responding to this with our reducers or dispatching it on our own but we can use it in our test cases to make sure that the reducer sets itself up correctly.

Pass in undefined as the state and the action object will just have the type set, and see if the default values get set for the state

test('should setup default filter values', () =>{
   
    const reducer = filtersReducer(undefined, {
        type: '@@INIT',
    });

    expect(reducer).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'), 
        endDate: moment().endOf('month')
    });
});


For the reducers that do not need a state (sortBy) you pass in undefined as the state b/c the default gets set up with the state

Since the reducer is what actually sets the different properties on the filters object we just call the filterReducer, pass in the different cases and make sure things change, we do not manually add the different properties to is like in actions.test.js b/c this the whole point of this is to make sure they get set correctly


Going to create a fixtures folder to hold the dummy data needed to run the tests, and import the array where needed 

Can test the whole object when EDIT_EXPENSES OR just one property that you choose to edit


test('should dispatch EDIT_EXPENSE', () =>{
    const reducer = expensesReducer(Expenses, {
        type: 'EDIT_EXPENSE',
        id: Expenses[0].id,
        updates: {
            description: 'Edited Test1',
            amount: 500,
            createdAt: 500,
        }
     });

     expect(reducer).toEqual([{
        id: '1',
        description: 'Edited Test1',
        note: '',
        amount: 500,
        createdAt: 500
    }, 
    Expenses[1], 
    Expenses[2]]);
});

OR


test('should dispatch EDIT_EXPENSE', () =>{
    const reducer = expensesReducer(Expenses, {
        type: 'EDIT_EXPENSE',
        id: Expenses[0].id,
        updates: {
            amount: 500,
        }
     });

     expect(reducer[0].amount).toEqual(500);
});

*/



/*
=-------------- SNAPSHOT TESTING / COMPONENT TESTING-------------=

The actions and reducers are easy to test but with a component we care about what renders under what situation. If i pass a prop into a compoennet and I would expect it to render one way vs a different way

Dont need to type a bunch of JSX in the toEqual NO

Going to start exploring how to test components based on user interaction, if click button or change input if the compoent is actually changing accordingly


Create test/components folder and files accrodingly


REACT-TEST-RENDERER

 How to virtually render the component, need a way to figure out what JSX comes back but not viewing it in browser, but accessing it in the code. There is a React library for this called REACT-TEST-RENDERER. Allows us to render components inside regular JS code and can assert something to what got rendered 

 Need to install: yarn add react-test-renderer 

import ReactShallowRenderer from 'react-test-renderer/shallow'



TWO DIFFERENT WAYS TO TEST REACT COMPONENTS:

1) Shallow rendering: not worried about user interaction or lifecycle events, just concerned about what is getting rendered
    - Only renders given component
2) Full DOM rendering: renders child components



Snapshot Testing: Allow us to track changes to data over time - makes it really easy to assert things about the components, keep track of changes, so if rendered output is changed we will be notified - if it is a good change we will keep it or if it is bad we will adjust accordingly 
    - Able to create a snapshot of Header at its current point in time and be notified if this ever changes, if Header output changes in a way we dont want we can catch, or in a way we do want we can allow that 
    - A single method from JEST: .toMatchSnapshot()
        - The first time this runs it will always pass b/c there is no existsing snapshot so JEST will create one, and will create a _snapShot folder storing all snapshots
        - The second time it will compare and pass if nothing has changed 


1) Testing Header Component: No state or Props so easy. import shallow rendering and set up test that uses react-shallow-renderer in the function
    A) Set up a new renderer: const renderer = new ReactShallowRenderer();
    B) Now actually render something by typeing renderer.render() and define the JSX we are trying to render in the render() argument
        - In this case it will be a single instance of the <Header /> component
        - renderer.render(<Header />)  <-- this is the output we are trying to test
        - We get access to the render() output on renderer 
            - Can console.log(renderer.getRenderOutput()); <- This will return the rendered output of the JSX passed in (<Header />)
                - This will log an object, what saw when we looked at what comes back from React.createElement() // 
                - Not going to make assertions about this object b/c too long we are going to use snapshot testing: 
    C) Use expect() to make an assertion about the renderer. Want to make an assertion about the render output with the method .getRenderOutput() . Going to use .toMatchSnapshot() calling it with NO arguments
        - expect(renderer.getRenderOutput()).toMatchSnapshot()
            - The first time this runs it will always pass b/c there is no existsing snapshot so JEST will create a new one about what the rendered Header output looked like. A _snapshots_ folder will be created to store all snapshots
            - The second time we run it it will take another snapshot and pass if nothing has changed and fail if something has
            - Now two big choices, can accept or reject changes, if reject we go back to file and take out bad code, but if want to make a real change and keep that change (like remove something on the Header). We are going to get a failing test once we do it, to accept the new state there is a prompt to press 'u' to update the changes in the CL - this will take new snapshot and replace the old one - now the new state for the header component to be tacking

    import React from 'react';
    import Header from '../../components/header'
    import ReactShallowRenderer from 'react-test-renderer/shallow';

    test('should render Header correctly', () =>{
        const renderer = new ReactShallowRenderer();
        renderer.render(<Header/>);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
    });




No docs on react-test-renderer b/c not a complex utility and doesnt test more complex things well like clicking buttons, changing inputs, etc - very difficult to do with react-test-render. Instead we are going to use ENZYM which is a library relased by airBnb. It is a renderer for React but a LOT more features to it, react-test-renderer is designed to be a simple utility for rendering and ENZYM uses it but it enzym comes with more features for ppl actually writing test cases

So we are going to use enzym to shallow render <Header /> and create snapshots from it 

--------------- ENZYME ------------------

1) Install
    - enzyme (at least v3)
    - enzyme-adapter-react-16 ?????
        - with v3 of enzyme comes the idea of an adapter to specify which version of react to test against (allows core library to be a lot smaller, and just specify which one you need )
        - yarn add --dev @wojtekmaj/enzyme-adapter-react-17 (for expirmental to be able to use ReactV17)

            import Enzyme from 'enzyme';
            import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
            Enzyme.configure({ adapter: new Adapter() });

    - raf
        - this is a polyfil for a browser feature that is request animation frame, this is something provided by browsers and when dont have it in testing environment it causes issues so instll it 

2) Create a setup tests file to allow configure to test environment to use enzyme adapter once instead of everytime we use enzyme
    - create file in src/tests/setupTests.js
    - import enzyme, and adapater and call a method for enzyme to work with adapter
3) Inside file:
    import Enzyme from 'enzyme';
    import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
    Enzyme.configure({ adapter: new Adapter() });

    - Enzyme.configure - can take tons of different things but we are going to call it with an object where we can specify various configuration properties. Adapter is probably only one ever used

4) Now when using Enzyme in the test cases it will add support to V17 React 

5) Set up JEST configuration .json file which allows us to specify that the setupTests.js file should actually run
    - Inside JEST documentation - configuration doc (can expose objects, add CL arguments, set up .json file but not yet)
    - There is a list of things you can customize using JEST 
    - setupFiles[array] - specify an array of files, Jest runs those files before it runs the tests and this allows us to set things up like the RAF and the setupTests.js file 
    A) Create file in the root of the project, jest.config.json 
        - Needs to be in json format, so {} and inside specify what you want to configure
        - setupFiles key to a value of an array of paths to files be our setup files
            1) RAF - "raf/polyfill" - in the raf docs this is where you are going to get the JS file where you add the polyfill in - Load first
            2) JS file we just created and setup: when adding local file paths in jest.config,json need to start with <rootDir>
        {
            "setupFiles": [
                "raf/polyfill",
                "<rootDir>/src/tests/setupTests.js"
            ]
        }
    B) Inside package.json need to change our jest script telling it where it can find the config file, specify the CL argument --config and set it equal to the filename
            "test": "jest --config=jest.config.json"

6) Explore what Enzyme gives us: the APIReference in the docs for shallowRendering and fullDOMRendering 
7) Shallow Rendering Header: much easier
    A) Create the variable WRAPPER and set it up shallow()
        - arugments = the JSX we want shallow to render - <Header />
        - Now with the shallow rendered <Header /> we have access to full API 

    import { shallow } from 'enzyme'

    test('should render Header correctly', () =>{
        const wrapper = shallow(<Header />)
    })

    B) find(selector) - like jQuery or docuementQuerySelectorAll - allows us to select the various elements inside the compoenet dive into those elements and make assertions about them 

  test('should render Header correctly', () =>{
        const wrapper = shallow(<Header />)
        expect(wrapper.find('h1(or .button/p)').length).toBe(1)
    })

        This will pass b/c 1 h1 on the page

        Can grab the text value off of element and assert something about it with text() method

    expect(wrapper.find('h1').text()).toBe('Expensify')   // test case will pass
     expect(wrapper.find('NavLink').length).toBe(3)


<======================> CORRECTION ========>


Was not taking snapshots correctly so need to dl 'jest-enzyme'

and import into setupTests.js

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "jest-enzyme";


Enzyme.configure({ adapter: new Adapter() });


AND change the jest.config.json file 

{
    "setupFilesAfterEnv": [
        "raf/polyfill",
        "<rootDir>/src/tests/setupTests.js"
    ]
}

snapshotSerializer and enzyme-to-JSON is NOT NEEDED YET the snapshots are going fine without it so far


*/

/*
=-----------------SNAPSHOT TESTING WITH DYNAMIC COMPONENTS--------=

=-----------------EXPENSE LIST COMPONENT TESTING -----------------=

This compoenent has props so we will be using dynamic testing to get this done 

When we are testing components we want to test the UNCONNECTED version b/c we want to be able to provide a set of dynamic props- so dont want props to come from the store, instead we going to provide props directily


1) Create expense list compoenent test file
2) Set up providing expenses directly to unconnected component
    A) export the unconnected version though a named export 
        export const ExpenseList = (props) =>
    B) import { ExpenseList } from ...... AND fixtures
    C) Create new test:
        test('should render ExpenseList with expenses', () =>{
            const wrapper = shallow(<ExpenseList />)
        });

        ExpenseList requires an array so we are going to pass one in as props expenses = {expenses}
            const wrapper = shallow(<ExpenseList  expenses = {expenses}/>)
    D) Set up the snapshot - by setting up the expect(wrapper).toMatchSnapshot
3) Now if component OR the expenses array that we pass in changes at all we will get a failing test

4) Can also create a test case to see what happens when we have no expenses (empty array)
5) Currently the expenseList component doesnt have any conditional rendering if it is passed an empty array (to eventually test it is rendering correctly), so need to set this up with a ternary operator to see if props.expense.length === 0

    FROM: 
    export const ExpenseList = (props) => (
        <div>
            {props.expenses.map((expense) =>(
                <ExpenseListItem key={expense.id} {...expense}/>)
            )}
        </div>
    );

    TO:
    { props.expenses.length === 0 ? <p>Please add expense!</p>: (
                props.expenses.map((expense) =>(
                <ExpenseListItem key={expense.id} {...expense}/>)
            ))}


    (Cant use an if statement in a JSX expression so use a TERNARY )

    This test case will still PASS b/c the rendered output is the same so need to add another test case so expect 'Please add expense!' if an empty array is passed in

    A) Now just pass in an empty array as the prop in the test case and then LOOK AT THE SNAPSHOT to make sure that you see the empty array message, now if that message changes or something actually gets rendered it will let you know its changed 

        test('should render ExpenseList with empty message', () =>{
            const wrapper = shallow(<ExpenseList expenses = {[]}/>)
            expect(wrapper).toMatchSnapshot()
        });



=-----------------EXPENSE LIST ITEM COMPONENT TESTING -----------------=

Need to add snapshot for waht it renders so we can track changes to the component over time

No connected component so can just use the default export


1) Same deal as above, but in the shallow render we have to pass in one expense from the fixture to make sure it renders correctly so need to pass it in as a prop
    A) Can do this by defining each property as a prop individually 

      const wrapper = shallow(<ExpenseListItem id={expenses[0].id} description={expenses[0].description} note={expenses[0].note} amount={expenses[0].amount} createdAt={expenses[0].createdAt}/>)

    B) Can do this by spreading out one object from the expenses array
        const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>

    C) CANNOT do it by only naming expense as a prop and setting it equal to an object on expeses array or equal to a spread out object on expenses array
        <ExpenseListItem expenses = {...expenses[0]}/> // NO
        <ExpenseListItem expenses = {expenses[0]}/> // NO



=-----------------EXPENSE DASHBOARD / 404 COMPONENT TESTING -----------------=

Same process over but for ExpenseListDashboard 

The import for the .CSS is still in your ExpenseListFilters component. You need to remove that line completely. (OR move it to app.js)

import 'react-dates/lib/css/_datepicker.css'; 

It's because we never told Jest how to handle any CSS imports it finds.

*/

/*

---------------- MOCKING LIBRARIES WITH JEST -------------------
----------------EXPENSE FORM COMPONENT TESTING --------------
Testing more complex components like Expense Form




Testing ExpenseForm component
1) Create file and import everything
2) Create simple snapshot test case to make sure things are running alright
    A) Each rerun of this will fail though b/c a prop to singleDatePicker will have different dates depending on when moment() is ran, so need a way to get consistent data back for that prop in this test case for the snapshots to match 
        - Get that done we are going to mock out moment() by creating a fake verison of moment() library to define when the code actually calls 
        moment() , just to return a moment() from a certain time
    B) GO to Jest docs and nav to manual mocks page to help create mocks of 3rd part libraries
        1) Create __mocks__ folder in tests folder and inside create a file moment.js
        2) Now need to define what mocked moment to look like, and since only usage of moment() in the expenseForm component is a function to call  get a time stamp back - sometimes called with nothing (current) or with a value to get a time back from the value 
        3) Setup default export for mock moment file as an arrow function 
        4) add timestamp as the firrst argument with a default of 0 (if argument isnt passed in so it will return a fixed point in time to snapshot passes)
        5) return an instance of actually using moment(timestamp); so we can actually get a real moment() object back 
            - CANT actually just import moment form 'moment' since this is going to look for the mocked version and will set up a funciton that calls itself = Stack Trace Error b/c itll just keep calling itself so we need to use the actual real moment module
            - Jest give us a way to use the real moment - jest.requireActual(moduleName)
                - This requires the actual module is used not the mocked one
            A) create const called moment and equal to function jest.requireActual('moment);
            B) Now we can call moment() in the file and pass in 0 (default) or a certain unix epoch time and actually get a real moment object back


-------- MOCKING MODULES IN JEST ---------=
The jest mock file makes it so that when moment() is called in test file (not in the real app), we will use the mocked version of the library. This allows us to set dummy data values, and in our case it sets the default moment to a timestamp of 0, so that all the snapshots use a consistent date. (vs the real app which uses a current timestamp which would be different every time).

Jest prioritizes the mocked version of moment (or any module you mock) for all our component files instead of the regular version.

We don't specify in our test file to use the mock of moment.js?

If we create a folder named __mocks__then jest knows to look there for any mock versions of the libraries we are mocking.


To ensure that a manual mock and its real implementation stay in sync, it might be useful to require the real module using jest.requireActual(moduleName) in your manual mock and amending it with mock functions before exporting it.



Now to create a test for expense form with data that is passed in like when edit expenses, so need to pass in an expense from the fixture to make sure that the values are being populated 

In edit expense we match the expense to edit by their id and pass it into expenseForm though the prop 'match' so need to use this as a prop when calling <ExpenseForm /> in the test with match = key and expense[0]=value

1) Create test and import expenses fixture
2) shallow tender ExpenseForm but with a prop as match={expenses[0]}


*/



/*

------------------ TESTING USER INTERACTION ==============
----------------- TESTING/CHECKING DIFFERENT STATE CHANGES WITH UI ---------

Need to simulate UI in test cases for onSubmit/onChange handelers so need to simulate those events.

Create a test case if form submitted with bad data(no description and amount) expect the error gets set and rendered to screen: onSubmit test case example


1) Create test case testing if error gets set
2) Shallow render expense form
3) Focus on actually submitting to the Form
    A) Find the form - by calling .find on the wrapper to have access to the form element in ExpenseForm
        1) wrapper.find('form')
    B) Simulate submit event: simulate(eventAsAString,[,...args]) (in enzyme docs). Simulate is called with the event as a string and the potential even arguments. Chain onto .find() call 
        1) wrapper.find('form').simulate('submit')
        2) Will get error saying cannot use preventDefault() on undefined b/c when simulate onSubmit the eventObject is not being passed in, so need to pass in an object with preventDefault() as a property set to a function that does nothing and this will quell error
            wrapper.find('form').simulate('submit', {preventDefault:()=>{}})
    C) Need to make sure this.state.error gets set by fetching the state off of wrapper using the .state([key]). .state allows us to fetch the state for the component 
        -  expect(wrapper.state().error).toEqual('Please provide Description and Amount') 
            - This will fail if the error message is changed though
        -  expect(wrapper.state('error').length).toBeGreaterThan(0)
            - This will pass as long as there is an error message, so if the .simulate() call doesnt happen there will be an error since the error: property will still be an empty string which === 0
    D) Wrap up this with a snapshot to make sure that after the error state changes it gets rendered
        - CAN EVEN ADD ANOTHER SNAPSHOT BEFORE .simulate() to make sure the error message is not showing up before the .simulate() is called - so two snapshots in this test case
        



Create a test case if description changes in the description input it actually does set the state.description to be that value : onChange test case example
Need to render expense form, change descroption input and make assertion checking the description state was set

1) Create test
2) Shallow render component
3) Access description's input with.find('input'), but need to match the first input using the .at() method passing in the index of the field you are testing, and then simulating a change in that input and passing in a mock event object as the second
arugment to .simulate()
    - The mock event object needs to have the same property structure as the real event obejct so when it is looking for the e.target.value it is able to grab the new text value

    wrapper.find('input').at(0).simulate('change', {
        target: {
            value: 'test'
        }
    })

    OR WITH DESTRUCTURING

    const value = "New Description"
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })

4) Then checking if that input with the simulated change does equal the state.description
    expect(wrapper.state('description')).toBe('test')



Creating a test case for changes to note textarea is the same but for .find('textarea')




----- Creating test case for changes to amount -------

We will have do two two test cases for this, one for something valid and one for something invalid so the .match() conditional logic is tested 

The first one that changes the amount is the same as above but need to make sure we make the value that is being set a string instead of an integer since .match() takes a string as the argument and will thrown an error if gets an int

The second you need to assign the variable value an INVALID number and check if the state does not change and is still an empty string

*/




/*
----------------- TEST SPIES AKA MOCKED FUNCTIONS ------------

Goal is to create functions that are fake functions created by Jest (expect() docs ) that we can make assertions about, can see if it was called, if it was called 5 times, if it was called with specific arguments

Spys allow us to create a function that we can then pass it into our component (or anything else) usually by setting it equal to the function call being handed down from a prop and then can make sure that when an event happens (like form submission) it was either called in general, called a certain number of times, or called with the correct data 


- To create spy = jest.fn() = this is a function with no arguments that returns the new spy we just need to store it on a variable 
    - able to create fake functions, pass into components and able to make sure theyre called as we expected them to be called

test('should call onSubmit prop for valid form submission', () =>{
    const onSubmitSpy = jest.fn();

})

- Once we have the spy we have access to a brand new set of assertions
    - Assertion to check if spy was called - .toHaveBeenCalled();
        expect(onSubmitSpy).toHaveBeenCalled(); // throw error if never called and fail test case and pass if it has been called


Some methods - .toHaveBeenCalled/.toHaveBeenCalledWith/.toHaveBeenCalledLastWith 


So these are what we need since we need to make sure the spy is called with the object with all of the formattted data when props.onSubmit() happens 

onSubmitSpy('Nicolas','Denver')
expect(onSubmitSpy).toHaveBeenCalledWith('Nicolas', 'Denver') // Pass
expect(onSubmitSpy).toHaveBeenCalledWith('Nicolas') // Fail
expect(onSubmitSpy).toHaveBeenCalledLastWith('Denver') // Pass






------------------ CREATING TEST CASE FOR ONSUBMIT OF VALID DATA THAT IS DISPATCHED TO REDUX STORE ----

First we need to render expense form with valid data from the fixtures/expenses, then simulate submit data, then check of state was cleared, then step 4 we need to make sure the props.onSubmit() was called with the object containing all of the correctly foramttted data 

1) Create test
2) Create spy 
3) Shallow render ExpenseForm and pass in match={expense[0]} and then onSubmit
    - Need to use match here to act like it is being edited so the values populate
    - Need to define onSubmit in the props b/c when simulated onSubmit it calls the props.onSubmit() so we set it equal to our spy
4) Simulate form submission passing in an object with preventDefault as a prop equal to empty function 
5) Make assertion about what happened. What actually happened? State.error should equal empty string and the spy should have been called with specific arguments 
    A) Expect state.error is an empty string: expect(wrapper.state('error')).toBe('')
    B) Expect spy is called with is the object with the state values, not just called in general
        - Cannot just do this expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[0]) , b/c this has the id value included and we cannot include this just in case it is being created for the first time from createExpense
        - So can pass in an object with everything defined without the id
        {
        amount: expenses[0].amount,
        description: expenses[0].description,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    }

*/


/**
 
--------------------- CREATING TEST CASE FOR ONDATECHANGE / ONFOCUS CHANGE -----------

These come with their own set of problems which is figuring out how to trigger these when theyre not set up with onSubmit/onChange handlers. Theyre set up by passing them down to <SingleDatePicker />. Need a way to trigger these and make them run, 

How to access props off of chilren that our components render, this allows us to make sure that things are wired up correctly with the children and that the handeler actually does it job correctly 


onDateChange: pass a moment() instance into createdAt and expect that it gets set on the state. 

1) Create test
2) Shallow render component with no props
3) How we can trigger the prop from that child component of <SingleDatePicker />
    - First need use .find() to find the instance/component- 'SingleDatePicker' is called 'withStyles(SingleDatePicker)' in react-dates V13 -- .find('withStyles(SingleDatePicker)')
      - Need to get one of the component's props and call it - onDateChange
    - Need to use a new method from Enzyme .prop([key])(for one prop) or .props() to read all props - let us read those prop values
        .find('withStyles(SingleDatePicker)').prop('onDateChange')

    - This will return the HANDELER we registered which is a function and you just call this function with whatever data it expects to be called with - which is a moment() instance for onDateChange . This set up is like connect()() which gives us back a function which we call something with

        .find('withStyles(SingleDatePicker)').prop('onDateChange')(moment())

4) Now we can actually make the assertion checking that the state was correctly set 
    const now = moment();
    expect(wrapper.state('createdAt')).toEqual(now)



onFocusChange: makes sure that actually sets calanderFocused to focused. This can either be true/false, and start it at false. So need to start out by calling it with focused:true on the object that is passed in as the argument to make sure calanderFocused ends up with true 


1) Same as above but with the line
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);

    We need to change it to .prop('onFocusChange') and need to pass in an object with focused: true

        wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused:true });


 */



/*

---------------- CREATING TEST FOR CREATE EXPENSE -----------------



---------------- mapDispatchToProps and REFACTORING CREATEEXPENSE -----------------

mapDispatchToProps is a function given by connect(). It is a way to return the dispatcher functions allowing you to abstract them away from the component themselves 

            onSubmit = {(expense) => { 
                props.dispatch(addExpense(expense))
                props.history.push('/')

 Above the .dispatch could easily be a spy: could take the unconnected component, shallow render, pass in spy and make sure it gets called 

 But addExpense(expense) action generator is a little bit trickier since we are referencing an imported  function not something that is passed in from props which make it harder to test than it need to be, but there is a function we can define in connect() that allows us to do this. 

 connect(): 
 1) The first function passed in as argument is mapStateToProps
    - to connect the store/state to props so can access
    - if we do not want to use this function we have to claim it as undefined as the first argument
 2) The second function passed in as argument is mapDispatchToProps 
    - similar to above but instead of state it works with dispatch
    - this gets called with dispatch as the argument so have access to use dispatch inside of function, and goal is to return an object where we define various props that will call dispatch so we can actually abstract away props.disptch(addExpense(expense)) with props.addExpense(expense); which is MUCH easier to test than the dispatch call 

To refactor to props.addExpense(expense); we need to set up the mapDispatchToProps function and define it in the object that is returned by that function 

1) return object with addExpense as property set to an arrow function which has the action generator inside of it
2) pass in the expense as the argument
3) dispatch is passed in by connect() so we have access to it so we call dispatch, and set up a call to action generator addExpense passing in the expense to action generator addExpense as argument


Now have the exact same functionality but we just have a new component that is A LOT more testable

    const mapDispatchToProps = (dispatch) =>{
        return {
            addExpense: (expense) =>{
                return dispatch(addExpense(expense))
            }
        }
    }

    REFACTORED:

const CreateExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit = {(expense) => { 
                props.addExpense(expense);
                props.history.push('/');
            }}
        />
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(CreateExpensePage)


THEN since has an inline function onSubmit, we can convert this to a class based component to be able to create methods and write cleaner code


class CreateExpensePage extends React.Component {
    onSubmit = (expense) => { 
        this.props.addExpense(expense);
        this.props.history.push('/');
    };
    render(){
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit = {this.onSubmit}/>
            </div>
        );
    };
};
const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
})
export default connect(undefined, mapDispatchToProps)(CreateExpensePage)


NOW since we always want to test the unconnected version of the components we need to export CreateExpensePage as a named export to use in our testing cases:

export class CreateExpensePage extends React.Component {

<---------------------- TESTING createExpense --------------->

To Test createExpense unconnected component to make sure it renders correcty
1) Create test case
2) Create spies
    A) const onSubmit = jest.fn();
    B) History is an object with the property push on it that gets called so we set the hisotry spy equal to an object with the push property that is set to the spy
        const history = { push: jest.fn() };  -- to access spy is history.push
3) Shallow render with the props that it needs which is the onSubmit() that the CreateExpense component calls in its onSubmit() call, and history which the CreateExpense component calls in its onSubmit() call
4) Make snapshot assertion to make sure always gets the props it needs



To Test createExpense unconnected component to make sure it handles onSubmit correctly

1) create file, and import everything
2) create test case
3) Create spies
    A) const addExpense = jest.fn();
    B) History is an object with the property push on it that gets called so we set the hisotry spy equal to an object with the push property that is set to the spy
        const history = { push: jest.fn() };  -- to access spy is history.push
4) Shallow render with the props that it needs which is the onSubmit() that the CreateExpense component calls in its onSubmit() call, and history which the CreateExpense component calls in its onSubmit() call
    - pass those in and we put spies in as those values to make sure theyre called 
5) In the test case we need to actually call the function onSubmit() that gets passed into <ExpenseForm /> that is set equal to the method onSubmit() that we created. Test the original call of the function and pass the spy in as the method that we created
    - so .find() expenseForm and access the prop we are interested in which is the prop onSubmit that is passed into <ExpenseForm onSubmit={this.onSubmit}/> NOT the method this.onSubmit using .prop('onSubmit')
    - And then what is returned from .prop('onSubmit') is the actual prop function, so we just chain on a function call calling it with the data that it would normally be called with which is an expense object
        - NO NEED TO .SIMULATE() SINCE A FUNCITON IS BEING PASSED BACK from .prop()
6) Now we have called the this.onSubmit() method that lives on the CreateExpense object with the correct inforamtion (expense object)
7) Need to make assertions about the spies and whether they have been called with the correct information
    <CreateExpensePage onSubmit={addExpenseSpy} history={history} />
8) Make assertion about history and if it was called with '/' to take them back to home page. Need to access the history spy which is on history.push
    - Now if redirect to a wrong page the spies will fail b/c not called with the correct data 
        expect(history.push).toHaveBeenLastCalledWith('/');

9) Make assertion about addExpenseSpy and if it was called with the correct expense object 



In the createExpense test the first three lines are the same since they are just setting up the test, and not making different assertions about the test itself. SO in some of the test cases we find that we spend a lot of time building up the test case, rather than actually writing assertions. So if there is a lot of duplicate code, JEST provides a way to create a single version of this with Jest Globals


--------------------  JEST GLOBALS and LIFECYCLE METHODS --------------
No need to import method/object anything as they are in the global environment


1) afterAll(fn): runs a single time after test cases in a given file complete
2) afterEach(fn): runs a every time after each test case completes in a given file complete
3) beforeAll(fn): runs a single time before test cases in a given file complete
4) beforeEach(fn): runs a every time before each test case completes in a given file complete

Using some of these lifecycle methods we are going to be able to set up the spies and component and then each test case can just worry about using those and set them up every time before 

So to do this:
1) Create let for each thing you are reusing: let onSubmitSpy, history, wrapper
2) Want to define each variable with fresh copies before every single test case so each test case starts with spies that have not been called and a virgin wrapper
    A) Using beforeEach(fn) we can do this to run some code before each. It takes a callback function, and in that CB we just redefine each variable 
        beforeEach(()=>{
                 addExpenseSpy = jest.fn();
                 history = { push: jest.fn()};
                 wrapper = shallow(<CreateExpensePage onSubmit={addExpenseSpy} history={history} />);

        })
3) Now can remove those three lines from each of the test cases! 



<---------------------- REFACTORING  editExpense --------------->


Need to refactor the action generator calls to be able to test easier, and make the actual componenet a class based component and not a stateless functional component to be able to assign methods to it and pull out the inline methods for cleaner code

1) Set up the render(){(<div>...)} with all of the visible output
2) Set up the methods and reference them where they used to be inline on the event listeners
3) This needs a variable match to match the correct expense to auto fill the inputs with that expenses information, so we need to change the mapStoreToProps function as we are only using the store/state in the match computation, so set a key as match and the value as to the .find() computation from earlier and passing in props as the second argument to be able to use the match.id that was passed in as a prop
4) Change ALL useages of props to this.props in the component
5) Define a new function below the component mapDispatchToProps to be able to abstract the dispatch calls away from the event listeners for submit/click
    - Pass in dispatch as the argument
    - implicityly return an object with two properties on it
        1) editExpense: set this equal to a function passing in the nessesary information to dispatch editExpense which is the id of the expense and the expense object with all the new info on it. Then in the function body return what comes back from calling dispatch and passing in the actual action generator editExpense passing in the id and expense object that we got from the parent function
        2) removeExpense: set this equal to a function passing in what it needs to dispatch removeExpense with is an object with the id property on it set to the id of the expense you are trying to remove. Then set the function body equal to what returns when dispach is called passing in the removeExpense action generator passing in the id that was passed down from where it is defined on onRemove()
6) Refactor the code above
    FROM:
        props.dispatch(editExpense(match.id, expense))
    TO:
        this.props.editExpense(this.match.id, expense) or props.editExpense(this.match.id, expense)


    FROM: 
        props.dispatch(removeExpense( {id: match.id} ))
    TO:
        this.props.removeExpense( {id: this.match.id} ) or props.removeExpense( {id: this.match.id} )

7) Change the default export passing in the new function as the SECOND argument to connect()
    export default connect(mapStoreToProps, mapDispatchToProps)(EditExpensePage);






<---------------------- TESTING editExpense --------------->

1) Create file, import evething
2) Create a beforeEach() to set up the test case for all assertions and declare the variables we want to use editExpenseSpy, history, removeExpenseSpy, wrapper
    A) In the beforeEach() function assign a spy to edit/removeExpenseSpy and an object with key as push and value as the spy on history to mock the actual history object
    B) Shallow render <EditExpensePage/> passing in all of the props it needs
        1) editExpense={editExpenseSpy} 
        2)removeExpense={removeExpenseSpy}
        3) history = {history}
        4) match={expenses[0]}
        
        These values are passed into <EditExpensePage/> as props that it needs to render correctly
3) Do a .matchToSnapshot(); one
4) Need a case to make sure editExpense is being dispatched correctly. Need to trigger onSubmit on the ExpenseForm that should run onSubmit that will use a spy to make sure it was ran with the correct info
    A) .find('ExpenseForm') and access onSubmit prop with .prop('onSubmit') and call what comes back from that by chaining a function call on -> () and need to call it with the same stuff it gets called with in the real use which is just an expense. Need to use the exact same expense as the match prop was set equal to 
    B) Make assertion about history.push spy to make sure .toHaveBeenLastCalledWith('/')
    C) Make assertion about editExpenseSpy .toHaveBeenLastCalledWith(expense[0].id, expense[0]) which is the same expense match was set to
5) Need a case to make sure removeExpense is being dispatched correctly. Need to trigger onClick on the button  that should run onRemove that will use a spy to make sure it was ran with the correct info
    A) .find('button') and .simulate('click')
    B) Make assertion about history.push spy to make sure .toHaveBeenLastCalledWith('/')
    C) Make assertion about removeExpenseSpy .toHaveBeenLastCalledWith({id:expense[0].id}) 



*/


/*


---------------- Refactoring expenseListFIlters componetn --------

Need to first refactor and abstract the dispatch call away from the compoenent to be able to test it easier 

1) Refactor all uses of dispatch into the new function creaated mapDispatchToProps and then just reference the property key when calling each dispatch call










-------------------- CREATING TEST CASE FOR expenseListFilters COMPOENENT -------


What do we need to test? regular snapshot setStartDate, setEndDate, setTextFilter, sortByDatE, sortByAmount


1) The component expects some data so add a filters file to the fixtures and export two different sets of data, one that uses the default values and one that uses where we have some actual things set up

2) Set up the beforeEach() looking at what the component needs, it references all of the this.props.actionGenerators so need to set those to a spy, and it references this.props.filter so need to pass in the default filters in as a prop set to baseFilter
3) Set up the snapshots, the first is the easy one but second one is what if it has different data from the populatedFilter
    - But some tests need the populatedFilter as the filter to make sure it can read and set data from the filter properties so need to create a test case to change the prop of filters={basefilter} to filters={populatedFilter}
    - Enzyme gives us a way to do this with the method .setProps(nextProps) - using .setProps() we can manipulate the props for a given component and then assert something about it so need to call it on the wrapper and pass in the new props as an object 
    expect(wrapper.setProps({filters: populatedFilter})).toMatchSnapshot();
4) setTextFilter: simulate a change in the input field passing in a mock event object with the property value set to a string, and then assert that the setTextFilterSpy was called with that string
5) sortByDate: simulate change in select field passing in a mock event object with the property value set to 'date', and then assert that the sortByDateSpy was called in general
6) sortByAmount: simulate change in select field passing in a mock event object with the property value set to 'amount', and then assert that the sortByAmountSpy was called in general
7) setStartDateSpy and setEndDateSpy: in one test create an object with startDate and endDate property set to moment() objects. Navigate to the DateRangePicker onDatesChange prop passing in the new date object, and then assert that the setStartDateSpy was called with the new startDate on that object passed in and setEndDateSpy was called using the endDate
8) should handle date focus change: Need to trigger onFocusChange and make sure state was changes so need to pass in a calanderFocued value
    - Navigate to the DateRangePicker onFocusChange prop passing in either 'startDate' or 'endDate' as a string NOT the actual moment() object ( easy to see in the docs for DateRangePicker what it needs 1 of three values null)
    - Make an assertion about the calanderFocused property on the state that it is startDate or endDate which ever you passed in 


*/


/*

------------------- DEPLOYMENT OF APPLICATIONS ---------------------------

1) Work with node.js and express library to create a production web server that serves up the production react application assets
2) Learn to config webpack for production reeducing bundle size and speeding up app
3) Use heroku delpoyment platform to deploy applications to production server live


-------------------- SETTING UP SSH FOR GITHUB -------------

Run the command to see if you have keys already in root project dir 

ls -a ~/.ssh 
If no file need to gen the ssh so run the command

ssh-keygen -t rsa -b 4096 -C "sankp001@gmail.com"

save to auto gened folder, no password

Run: ls -a ~/.ssh  again to see that they generated the id_rsa is the private key file and the id_rsa.pub is thepublic file to share with github and other services

The ~ is shorthand for the user directory 

Now the next cmnd makes sure that when we try to communicate with other srevices like github it actually knows which ssh keys to use. This requires us to use a tool called sshAgent,first thing is to make sure it is running 
1) eval "$(ssh-agent -s)"  : check if ssh agent is running and if not itll start it 
2) Acutally add the key using:  ssh-add and then add the path to the private key file . Not the pub file
    ssh-add ~/.ssh/id_rsa
3) Now can see that the identity has been added and can take the public key file and give it to 3rd party services like github. So need to take the contents of the id_rsa.pub file and copy to clipboard so we need to 
        pbcopy < ~/.ssh/id_rsa.pub
4) Now need to actually give it to github, by going to github going to settings, SSH and GPG keys and pasting they key in the new ssh textarea
5) Run test cmnd to make sure it was set up correctly
    - In terminal run : ssh -T git@github.com      and then type yes





------------------------ SETTING UP WEBPACK PRODUCTION BUILD ---------

Can issue the yarn run build cmnd to see that our current development build is around 7 MBs which is crazy big. Almost all of this is source maps, so need to optimize things for production. 

Since we are getting a message that bundle.js is larger than reccomended for production we are going to try to get as much stuff outside of bundle.js and into other files that can optionally load.

1) Figure out how to run webpack in production mode. In docs/guides/production. Here we see that if we issue the webpack -p  cmnd it minifies all JS code and tells the otheer code to prepare itself for producstion, which libraries like React load some extra stuff for development purposes, but when we run this cmnd we are setting the NODE_ENV = "'production" that is going to signal to those 3rd party libs to load the most barebones version possible 
    A) In package.json we change     
    "build": "webpack"  to     "build:dev": "webpack",

    And create a new script for production":
    "build:prod": "webpack --mode=production",

2) Need to actually change the contents of the webpack.config file whether we are running in dev or prod mode 
    - The goal is to make a variable isProduction to use to determine what values to set down below. To do this we need a seperate way to setup the webpack.config file. Instead of exporting an object we need to export a function. In webpack.config.js we can choose to either export an object or a function that returns an object. The advantage of this is that the function actually gets called with some arguments:
        - env: the environment

    FROM: 
module.exports = {
    entry: './src/app.js',
    output: {
    // needs two things: path and filename
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude:/node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // This is for source mapping 
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
};


TO:

module.exports = (env) =>{
    return {
        entry: './src/app.js',
        output: {
        // needs two things: path and filename
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude:/node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }]
        },
        // This is for source mapping 
        devtool: 'eval-cheap-module-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        },
    }
}


3) We need to modify the production build call to pass in a variable to be able to access that variable in the webpack.config file to be able to conditional run a different type of source mapping. This is taking up 90% of the space when we are production compiling. The new source map 'source-map' takes a lot more time to build and it is an external file, which is great for production b/c unless someone opens the developer tool it will NOT get loaded. For regular users the browser will never make a request for this file


    So we are going to change the script to:
    webpack --env production

    With the --env flag. We are able to access the production property which will be set to true on the env object. So in the top of the webpack.config file we can put:
        const isProduction = (env.production === true );

    And below use different source maps depending on if this value is true or not
            devtool: isProduction ? 'source-map' :'eval-cheap-module-source-map',

    Can go one more step and add a mode: property so we know which mode we will be using:
            mode: isProduction ? 'production' : 'development',




Now it is out putting two files, bundle.js (actual app file ) and bundle.js.map (which is 90% of the file size)


-------------------- HOW TO BREAK OUR CSS OUT OF THE BUNDLE FILE INTO OUR OWN STYLES FILE -------------

As of now all css styles live inside bundle.js so it is bigger than it needs to be, and if we have styles here the styles will not get added to the browser until after the javascript runs which takes some time.

So going to have webpack output a javascript file and a seperate css file and then link it into index.html

Still need to import these things to let webpack know what styles we want to run in the app:
import 'normalize.css/normalize.css'; // css reset
import './styles/styles.scss'; // used to import CSS
import 'react-dates/lib/css/_datepicker.css';

BUT when webpack does run, it is going to take all of those styles and pull them out into a seperate file 


Need to use a webpack plug-in to get this done: extract text webpack plugin

This allows to extract text out of bundle.js, which text? The text that matches the module.text regex in the webpack.config.js /\.s?css$/

So every time you see a css or scss file process it then take the text and instead of including it inline, dump it to a seperate file 

yarn add -D mini-css-extract-plugin (the -D will install this as a devDependency which are dependencies needed in the development workflow but not while running the code, a direct dependeny is like React and devDep is like this with babel)

In webpack.config.js:

1) Require the new plug in the beginning of the file before the function
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
2) Make a new instance of MiniCssExtractPlugin for the styles that we are extracting. It takes one argument in the instance is the name of the file in an object with filename as a propety. styles will be the name
    const CSSExtract = new MiniCssExtractPlugin({ filename: "styles.css" });
3) Replace 'style-loader' in the use array with: MiniCssExtractPlugin.loader
    - Not using style-loader b/c this handled the inlining of the styles which we are not doing any more since we are breaking them out to own file 
use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] 

4) Need to pass CSSExtract into a plugins array that lives on the root object not within the module object
    plugins: [
      CSSExtract
    ],

5) Test work by running yarn run build:prod to make sure you get a seperate styles.css file

6) IMPORTANT!!! Then Need to add the link tag in index.html to actually load the styles.css file, and that makes sure that the styles load before the JS

7) Run live server to make sure last compilied bundle is serving the .css file correclty

8) Need to set up the source maps for the css. The mapping works only for the production build but for the development builds or dev-server it would not work as expected. to test this we can delete all JS and CSS from the public folder and run the dev-server so those files get generated in the development build. Then looking at a style in the dev console you will see that all the css is being dumped into one file (which is fine) but the source maps arent showing the original place where these styles came from which makes things a whole lot more useful. Need to tweak use array on rules array in webpack config and type of source map for dev.  Failing in development b/c type of source mapping used in development (eval-cheap-module-source-map). Source maps have bugs that are very hard to track down, but this is one that works for andrew 

    A) change eval-cheap-module-source-map to 'inline-source-map'
    B) Need to enable source mapping for css-loader and sass-loader. Google css loader to see options that we have for it. One is sourceMap. To enable source mapping for the css-loader we go to it in the webpack.config file and reaplce 'css-loader' with an object
    {
        loader: 'css-loader',
        options:{
            sourceMap: true
        }
    }

    C) Now need to enable source mapping for the scss-loader as well doing the same thing

    Now have a more development friendly build for styles.css source maps. Can see this in action by looking at the date picker styles it is coming from the datepicker.css file and not from one styles file with everything in it

WHENEVER USING THIRD PARTY WEBPACK PLUGINS MOST LIKLEY GOING TO HAVE YOU ADD SOMETHING TO THE PLUGINS ARRAY. The plugins array is where you can set up all of the plugins that should have access to change and work with the existing webpack build 



*/


/*

--------------------- CREATING PRODUCTION SERVER WITH EXPRESS -----------------

None of the servers we have been using are suitable for production, b/c comes with a lot of stuff that is not needed for production that is taking up resoucres. So create a very simple express server with node.js

Express is a great tool to create servers with node, but is also a very large tool. We un it form the command line using the node terminal command

1) Create a new root dir - server and new file server.js
2) Install express in our project yarn add express
3) Load in express and create a new express application in the server.js file
    A) const express require('express');
        - Now the express library is in the file
        - require is the node way of importing something

    B) Create a new instance of express: const app = express();
        - No arguments, have an express application now
        -Customize the application by telling it where the files live and what port it should listen on  
4) Tell it to serve up the public folder and everything inside
    A) app.use(); is one way we can customize our express servers and will be suing this to register some middleware 
        - middleware = something that runs for each request so if somone makes a request to the server you might want to log something to the screen, or if a request is made we might want to run some code to serve up that asset from the public directory. All this is built in express so just need to use express.static()
    B) app.use(express.static()); - here we are taking the return value from express.static() and passing in to app.use()
        a) Static takes an argumnet, the path to the public folder so make a const holding it while taking advantage of the path module that we took advantage of with path.join in webpack.config which allow us to join the dir in webpack to the public dir. So need to load in path to use it with require, and then use path.join(), the first arugment will be the current directory __dirname, and the second will be the next part of the path (path.join puts all of the path pieces together) so we go up a folder and then another arugment into the public folder '..', 'public'
        const path = require('path')
        const publicPath = path.join(__dirname, '..', 'public')
        app.use(express.static(publicPath))

        Now have an express application that will serve up all assets from that dir
5) Actually need to start up the server so do that with app.listen(); when we do listen we need to listen on a specific port. port 3000 which everyone has and can attach to for development purposes without getting warning from operating system. 
    A) first arugment is the port, and the second is a CB function that will be called when the server is actually up
        app.listen(3000, () =>{ console.log('Server is up')})
6) Start things up by running node allowing us to run a node script file in the CL
    - will need to production assets built using yarn run build:prod first
        node server/server.js
7) IF at create expense page and refresh we get an error: 404 Cannot GET /create. B/c there is no /create file or folder inside public so we need to serve up index.html for all files that do not have a match to make sure our browser router still works. This is something that we did for the dev-server, in webpack.config we set the property           historyApiFallback: true, this served up index.html in the public folder everytime we got a 404 message, so just need to do the same thing in server.js to make sure everything works when directly visit it.
    A) Add a single call to app.get() - this lets us set up some function to run when someone makes a function request to our server. In our case we need to call this with two arguments:
        1) The first is the path. In a regular application maybe /create or /help but we are going to use the asterix * to match ALL unmatched routes. SO if it is in the public folder, great, if not we are going to serve up the same thing everysingle time.
        2) The second argumnet is a function to run. In the function we are going to be handeling all of the unprocessed requests and we just need to send back the index.html file in the public dir. This function gets called by express with two arguments:
            1) Request object (req): the request object contains info about the request 
            2) Response object (res): the response object lets you manipulate the response the express server makes to whoever makes the HTTP request. In our case we just want to use a single method res.sendFile(path.join(publicPath, 'index.html')). This allows us to send the file that is found at the path passed into the method back to user. We passed the publicPath variable in and joined it with index.html
 */



/*

--------- DEPLOYING ONTO HEROKU ------



*/