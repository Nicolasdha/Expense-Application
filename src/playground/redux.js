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

Same as AWSBeanstalk and digitalOcean 

Need to install heroku CLI (already have)

1) Need to authenticate with Heroku so use CL: heroku login
2) Create Heroku app using: heroku create overhead-expense
    - if run with no argumnet it gens a name but if provide a name it will call it that
    - this set up the project on Heroku and add a new git remote to connect to heroku 

Need to make a changes to application to let heroku know what to do, right now it doesnt know how so we need to

1) How to actually run the node server: create start script
    - When heroku starts up applicaiton it is going to try and run the start script in package.json, so we need to make one that exlicitly says go to server/server.js and run through node 
    "start": "node server/server.js"

2) Make change to server.js b/c currecntly we are listening on a static port of 3000, this is ok for local dev but wont work on heroku, heroku will provide a dynamic value to the application, not a static valuable you type in . Heroku proviudes you with an environment variable (can change everytime you run code) so we need to read off of something
    A) Create a const port and get value from process.env.PORT
        - PORT is the environment variable that heroku auto sets
        - so IF this PORT variable exists that means we are on heroku and want to use the const port but if not we can default to 3000 for local by using logical OR operator ||

        const port = process.env.PORT || 3000 
    B) switch out 3000 with the port variable in app.listen()

3) Need to teach Heroku how to run Webpack. We added node_modules to .gitignore so it isnt in repo since it is a generated file, the bundle/bundleMAP/styles/stylesMAP in piblic are generated too when we run webpack and not need to commit them to repo SO need to teach heroku to run webpack b/c they might not be there. 
    A) There are custom scripts heroku looks for and runs as app starts
        1) "heroku-postbuild": runs after heroku installs all dependencies, great place to run cmnds to build the proj with webpack/grunt/gulp. Here we just want to run the build:prod command so value is just the CL code - yarn run build:prod
            "heroku-postbuild": "yarn run build:prod"
        2) "heroku-prebuild": runs before dependancies get installed, dont find too useful so NOT using
    B) Add those files to .gitignore b/c change all the time
        public/bundle.js
        public/bundle.js.map
        public/styles.css
        public/styles.css.map

4) Now commit and push to git and heroku
    git push
    git push heroku master 

heroku open // opens webpage
heroku logs // gives error messages from heroku is debug and for stack traces

*/



/**
 
--------------------------REGULAR VS DEV DEPENDANCIES -------------

All of the depencies in packack.json are getting installed on heroku when it is not using all of them eg. enzyme, live-server, etc

So we can create two sections of dependancies:
1) Dependancies which will get installed locally and on Heroku
1) Dev Dependancies which will only get installed locally


Download chalk (a way to color the output in the CLI) as a dev dependancy using the -d flag, 
yarn add --dev chalk 

Now move the following dependancies to dev deps, deps that are not needed in production

enzyme
enzyme adapter 
jest
live-server ( can even remove serve script)
react-test-render
webpack dev server

Question is how do we install one or the other?
1) Delete node_modules
2) yarn install --production 
    - this tells yarn to leave off the dev deps - this is exactly what is running on heroku
3) yarn install
    - We want dev deps locally so this will install all dev deps too 

Now slightly smaller build processes, a bit faster

In the public dir we take the four compiled assets and theyre not in a folder, going to make a dist folder b/c not ideal, a bit easy to manage 

Need to make tweaks to webpack.config b/c need to change where files get dumped and to index.html 

1) Change index.html, change script import from /bundle.js TO: /dist/bundle.js, and the same thing with the styles

2) Change webpack, the output path tells webpack where to dump all assets so add on a third argument to path.join(__dirname, 'public','dist')
    - webpack will create dist as it add assets to that folder

3) Since we are changing where the assets end up we need to tweak the webserver in webpack.config. Need to add on a single property on webpack docs its outlined in devServer.publicPath = this lets you specify where bundled assets should live. By default it is the root of the server, 
 By default the devServer.publicPath is '/', so your bundle is available as http://localhost:8080/bundle.js

    A) On devServer object add on publicPath key and set equal to '/dist/'

Now can run devServer even without the files since devServer just uses the virtualization of the files anyway so it will work

Now can run the production build to make sure the dist folder gets created with the assets inside

Now can run the node server to make sure everything is working yarn run start and visit port 3000

push to git and heroku

 */




/*

--------------- NEW FEATURE WORKFLOW ----------------

Everything it take to add a new component, thinking, implementing, testing, delploying - end to end


Going to make some changes to expenseListItem comp to format data, good idea to open up test file too of anything you are changing 

Going to format the currency and created at for human readable stuff

Created at just need to make a moment object out of createdAt value and .format it

Amount: going to use a 3rd party library called numeraljs to make it easy 
    - so install numberal, import, call it (similar to moment)
    - need this for comma seperators and decimals 


*/



/*

-------- ADDING A EXPENSES SUMMARY COMPONENT -------------

Create own component and append an instance of it to expenseDashboard page, need to connect that component and filter out visible expenses in that component since expenseDashboard doesnt need that data anyways

Need to create test cases for it once it is done, in the video answer abstracted the function away to map and reduce all amounts into one for the total but I kept it in the component. The component is a little busy because of it but I think its nice to have in it but maybe abstract away later 

*/

/*

---------- FIREBASE 101 --------------------

Gives data storage, authentication, user accocunt and more 

First explore in isolation to create DB, connect CB and perform CRUD ops 

At its core firebase DB is a NoSQL DB that resemebles an object with key value pairs where data is stored key=string value=anything 

Create DB, the rules allow us to config who is allowed to read/write to the DB. Very important in locking down data, but for now need to loosen up rules to allow anyone to read/write to the DB, great for looking at the basics for FB without having to look at authentification at the same time. Start in test mode. Change rules over to:
{
  "rules": {
    ".read": true,
    ".write": true
  }
}

To to homepage and click add firebase to website, they give you script tags to add into html file but going to install using yarn, and then there is a config object that we will copy/paste into our code 

yarn add firebase@latest 

To use: 
1) Add new folder in src dir  - firebase
2) New file in folder firebase.js
3) This is where we are actually goint to connect to the DB - once in this file and then other files in proj can use the connect by importing what we have in the file
4) Add the following lines:
    import firebase from 'firebase';
    import 'firebase/database';
    A) The * takes all of the named exports from firebase and dumps them on a new variable firebase. This is required b/c firebase doesnt have default export. Can do this as well with our files with multiple exports 
5) Make a connection to our DB!
    A) Grab config object that was given in browser - can change to const
    B) Use method that was given to initialize firebase to work with the specific applications whos config is above
    C) Test connection with one statement: firebase.database().ref().set(object) (this will be more in deatil below)
        - passing in a simple object to test connection - name: 'Nicolas Ha'
    D) Firebase file never gets imported by the app so its never going to run and wont get written, so for the moment going to import it in app.js to make sure it works
        - import './firebase/firebase'
    E) Start dev-server, and mke sure no error, go to FB dashboard online and look under data tab in DB

*/




/*

------------ WRITING DATA TO FB DATABSE ---------------

Add more data onto object just to see the data change on the dashboard 

Now to talk about the line: firebase.database().ref().set(object)

firebase.database() - since FB has a lot of other functionalities (authentication, hosting, test lab, machine learning, etc) and all of those things we have access to in the web app through the firebase module, so to get the DB related features we call .database() (authentication is .auth()). Never pass argumnets into database() just call it naked.
    - can create a variable: const database = firebase.database()

.ref() - short for reference and this give us a reference to a specific part of our database. In SQL DB might have various tables for app like user, notes, amount, table etc. MongoDB is collections. For FB its references to reference different part of my DB and store info there, users,notes, etc. Not passing anything in YET, when call it naked we get a reference to the ROOT of the DB. 

.set() - Can be called on a reference to set the value of that reference. Do NOT have to pass an object to set, can set string etc
  database.ref().set('Scoooops'), this will completley override the object .set before it leaving only the string on the DB.
    - This override is important b/c if you reference the root and just try and change a property on the object that is there it will override the object with an object with just that property that you tried to update
    - To JUST update a property on the existing object we have to pass an argumnet to ref so we are not working with the root. The argument is a string of the property we are trying to set
        database.ref('age').set(30)

    This is just one level deep though so to access the city/country which is nested in location we do
      database.ref('location/city').set('Charlotteville')

    To add something completley new onto the root obj just reference the key that isnt there yet and it will make it and set it to something:

      database.ref('attributes').set({
        height: '6FT1IN',
        weight: 160,
  });

  
  All data changing is ASYNCRONOUS b.c it needs to comm with the server and other lines of code with processed before that happens. All calls to set, initialize request, push to server, server need to process, and server reponds. So any console.log("data change complete ") will run before the data change actually completes. Need a way to actually know when things are done settting we need to integrate PROMISES




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
    programmer: true,
    location: {
        city: 'Denver',
        state: 'Colorado',
        country: "United States"
    }
  });

  database.ref('age').set(30);
  database.ref('location/city').set('Charlotteville');
  database.ref('attributes').set({
      height: '6FT1IN',
      weight: 160,
  });

*/


/*

------------- PROMISES AND ES6 PROMISES ------------------

Lets us do something after setting DB is complete, new file in playground to play with them, import temporarily to app.js so it runs

Easiest way to explore is just make a promise and play with it

1) Make a promise with new keyword and promise constructor function passing in a CBF, and in here is where we do the long running async task (FB data change, server request, api request, take pic with webcam, look for file in file system etc)
  - When it is done we call one of two functions depending on if it went well or not. These functions are provided for us
  1) resolve - all good
  2) reject - something went wrong


  - const promise = new Promise((resolve, reject) =>{
    resolve('All went well');
  });

  Most of the time the above code is provided for us, so wont see it alot b.c lives in FB library. We are going to be using a lot of promises by method calls like .set. So how to do something when it succeds or fails? Access the promise and register some call backs. So on the promise above we call .then() - this lets us register a callback that fires when and if the promise resolves. The data from the promise that was outlined in the resolve() is passed into the then auto, so just name it and use it
  
    promise.then((data) => { console.log(data)}); // 'All went well'

To simulate a delay using setTimeout() to force things to wait for a few secons
    setTimeout(()=>{
        resolve('All went well');
    }, 3000)

Can attach a chain of .then() but this is promise chaining which is a lot easier with async/await 

A promise can be resolved/rejected - cannot do both, and can only resolve/reject a promise a single time so calling resolve() twice will be ignored on the seond call, And can only pass a single argumnet to resolve or rejct. So if need more than one piece of info resolve and object with the things you need on it. Reject throws an error, and can do something after a reject (like after a resolve) with .catch chained on after the .then(CBF).catch(CBF). Can try request again, print error to user in browser. Now the promise wont be throwing JS errors it will do the .catch CBF instead which is C.L something below 

    const promise = new Promise((resolve, reject) =>{
    resolve({name: 'Nicolas', age: 29});
    reject('something went wrong')
  });

  promise.then((data) =>{
      console.log(data)
  }).catch((error)=>{
      console.log('Error:' error)
  })

.then() can take TWO arguments and the second argumnet is treated like the .catch handeler but it is a littre more confusing than the .catch methods b/c clearer to read 

 promise.then((data) =>{
      console.log(data)
  },(error)=>{
      console.log('Error:' error)
    )

Very rarley we will be creating our own promises, usually created by the library we are using. So we are just going to attach handlers for resolve/reject


NOW connecting to firebase.js, where exactly are we going to be putting them in the code and what to do if sync vs fail to sync


-------------- SETTING DATA WITH FB AND MANIPULATING THE RETURNED PROMISE TO SIGNIFY CHAGNES WERE MADE -------------
.set() returns a promise so can just continue chaining after .set()

database.ref('attributes').set({
      height: '6FT1IN',
      weight: 160,
  }).then(() =>{
    console.log('data saved ')
    }).catch((error)=>{
        console.log('This failed', error)
    })


In the docs we can learn what comes back from all of the promises: NOTHING for set(). So just need to c.l something

To trigger error handeler, we are just going to block anyone from reading/writing so changeing the true to false in the rules in FB and rerunning it. The error will be triggered without an actually JS error b/c we actually caught it. W/ semi generic errors to not expose too much data for malicious stuff


------------------------- REMOVING DATA FROM FB DB----------------------

If want to wipe isSingle from DB with .remove() which is also called on the references 

database.ref('isSingle')
    .remove()
    .then(()=>{
        console.log('removed')
    })
    .catch((e)=>{
        console.log(e, 'error occured ')
    })


Can also use .set(null) to remove things and still returns a promise 
    but remove is more explicit


---------------------- UPDAING DATA FROM FB DB -----------------

How to efficiently update data. Efficiently b/c can do update with the .set and .remove but using the .update() method we can do multiple things with one call instead of a lot

database.ref().update(object)

.update() HAS to be called with an obejct! B/c the whole poing of it is to update everything we want in one shot. 

database.ref().update({
    name: 'mike',
    age: 33,
    job: "Developer",
    isSingle: null,
})

Here we are targeting the ROOT and changing the name and age but eveything else will stay unlike .set() that will erase everything expect the things that are passed into .set()

Can also add something NEW on if wanted with a new key and setting it to something. Can also DELETE them by setting the key value to null

Switching the nested objects. Want to change the city to Boston and the job to Project Manager 

database.ref().set({
    name: 'Nicolas Ha',
    age: 29999,
    job: 'Software Dev',
    location: {
        city: 'Denver',
        state: 'Colorado',
        country: "United States"
    }
  });


  database.ref().update({
      job: 'Project Manager',
      location: {
          city: 'Boston'
      }
  }

Above DOES NOT work. It deletes state/country b/c the update object ONLY updates that the root level so when we go into nested objects it is not going to update the nested objects properties it is going to update the whole nested object to be the new object passed in. So instead of providing a value for location we need to provide the reference location as the key and the new value as the value. So we reference the path to the thing that you want to update but need to put it in quotes since it is not valid JS b/c it contains a /


 database.ref().update({
      job: 'Project Manager',
      'location/city': 'Boston'
  })


  .update() also support promises and then chaining


*/



/*

-------------------- FETCHING DATA FROM FB ----------------------

Can fetch data one time to get some value

Can also set up a subscription to get the data whenever anything changes

To fetch all of the data into JS so we can actually do something with it, eventually rendering the data with React calls

Still going to get a reference of the root, can get just location info or just the name as well.

Using the .once() method that takes one argument - the event type 'value' if just trying to get all of the data at a specific reference
.once('value') returns a promise which we maniuplate to do seomthing with data when it comes back or with the error if it throws one 
database.ref().once('value')

The data that comes back from a .once() call is called a SNAPSHOT. One the snapshot we have access to our data. But we need to handle reading the data on the snapshot. Can extract the object using snapshot.val()
.val() is a function that we call with no arguments and returns the data we requested 


This will get whole DB once and log it
database.ref().once('value).then((snapshot)=> {console.log(snapshot.val())}).catch(()=>{console.log(e, 'error fetching data')})

This will get name once and log it
database.ref('name')
    .once('value')
    .then((snapshot)=> {
        console.log(snapshot.val())
    })
    .catch(()=> {
        console.log(e, 'error fetching data')
    })


This is the data for a single time - either succeds or fails . once()

There is a way to have the server notify us about changes - .on()

.on() is a method that listens for something continuously. .on() takes a CBF as the second argumnet to actually run some code after we get the referenced value back. Identical to the .then() chain b/c that CBF is called with the snapshot of data which we can do things with. Pormises wont work here b.c they only run once and resolve/reject with a single value so need a funciton to rerun everytime something changes 

database.ref().on('value', (snapshot) =>{
    console.log(snapshot.val())
})

Now we have subscribed to changes so CBF run everytime if the data ever changes.

We can be notified of errors by passing in a third argumnet to .on() as an error handling CBF


database.ref().on('value', (snapshot) =>{
    console.log(snapshot.val())
}, (error) =>{
    console.log('Error with data fetching', error)
})

We can unsubscribe by using the .off() method. We do this by accessing the same ref, and calling the method unsbscribes ALL subscriptions to that reference 

database.ref().off()

Can be selective about which subscription we unsubscribe to by passing in a CBF to .off() b/c .on() actually returns the function that you have subscribed to so can create a variable for each subscirption and pass that variable into .off() to cancel that single subscription

const onDBValueChange = database.ref().on('value', (snapshot) =>{
    console.log(snapshot.val())
})


database.ref().off(onDBValueChange);

*/


/*

=--------------------- ARRAY DATA IN FB -----------------------=

Have to figure out how to store list based data, b/c FB does not support arrays 

in MongoDB we have a collection of documnets, in sql we have a table with rows, with FB we have

If try to define an array of object and set it in FB DB, it gets converted into an object like structure with child locations stemming off of the root where the property of the .ref() value (either root or 'notes' or anything) is just the index of the item on the array that is passed in. So the following array

const notes = [{
    id: a42g2,
    title: todo,
    body: clean,
}, {
    id: q987h,
    title: dinner,
    body: cook pasta,
}]

  database.ref('notes').set(notes)


looks like: 
notes: 
    0:{
        id: a42g2,
        title: todo,
        body: clean,
    },
    1: {
        id: q987h,
        title: dinner,
        body: cook pasta,
    }



Technically we can work with this but if we want to update,remove,fetch a note we would want to do the CRUD ops by selecting a note by its ID. Which is difficult to do in this set up. SO we need a way to store info more suited to how FB stores data. An object at the root, our property of notes which is NOT going to be an array itll be an object, and in FB world they keys on this object will be the note's id (auto gened ids) whose value will be an object with the properties of the note (excluding id prop). So anytime we want an arry we set it up with a unique identifier and set its value equal to an object where we put the array stuff.


const firebaseNotes = {
    notes: {
        a42g2: {
            title: todo,
            body: clean,
        },
        q987h:{
            title: dinner,
            body: cook pasta,
        }  
    }
}


SO how to we auto gen id's and set them as values to save to FB? 
database.ref('notes').push(value)

When we use .push(value) FB will auto create a new property on our refernce(notes here), and it will give it a random value. It takes the value we pass into push and sets it as the object value

database.ref('notes').push({
      title: 'todo',
      body: 'clean'
  })

WILL BECOME:

  notes: {
    -MVrKsRkn06F5YAR7cPW: {
        body: "clean",
        title: "todo"
    }
}

Where -MVrKsRkn06F5YAR7cPW is auto genned by FB. This is how we are ging to work with list based data in FB, storing it in this structure. This makes it easy to access an individual item to manipulate it 



How do we get access to the note to manipulate it?

Can copy id from FB dashboard and do database.ref('notes/-MVrKsRkn06F5YAR7cPW').update({body: "Workout"})
(BUT remember to get rid of .push() code b/c it will keep pushing the same data onto the notes object with a new id)



Need to figure out how to fetch the array-like data(the object structure that FB stores) and do something with it in redux does expect an array. To get all of the expenses and manipulate them

To read the data off of the expense ref = 

database.ref('expenses').once('value').then( (snapshot) =>{
    console.log(snapshot.val())
})

So we need to do a conversion of data by using a snapshot method - .forEach() to iterate over every expense and get a childSnapshot of each item in the object. With this we can declare an empty array and push each childSnapshot onto the array creating an array of expenses. We can get access to any key value on a snapshot with another snapshot property .key. Can use .key on the childSnapshot to get its auto genned id as a string. 

The expenses array in the app expects an id property to be defined to do stuff like editExpense etc SO when we are pushing each childSnapshot to the array we can make it an object, set the id: value to childSnapshot.key to push the expense id with it and then spread out with the spread operator the rest of childSnapshot

  database.ref('expenses').once('value').then( (snapshot) =>{
    const expenses = [];
    snapshot.forEach((childSnapshot) =>{
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        })
    })
    console.log(expenses)
})



To subscribe to changes and print the array of object each time = 

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


Subscribing to other events in the Firebase version of an array list above. the .on() has a few different event types that we can use:

value event
Will trigger once with the initial data stored at this location, and then trigger again each time the data changes. 
ref.on('value', function(dataSnapshot) {

child_added event
Will be triggered once for each initial child at this location, and it will be triggered again every time a new child is added. For ordering purposes, it is passed a second argument which is a string containing the key of the previous sibling child by sort order, or null if it is the first child.
ref.on('child_added', function(childSnapshot, prevChildKey) {


child_removed event
Will be triggered once every time a child is removed. The DataSnapshot passed into the callback will be the old data for the child that was removed. A child will get removed when either:

a client explicitly calls remove() on that child or one of its ancestors
a client calls set(null) on that child or one of its ancestors
that child has all of its children removed
there is a query in effect which now filters out the child (because it's sort order changed or the max limit was hit)
ref.on('child_removed', function(oldChildSnapshot) {


child_changed event
Will be triggered when the data stored in a child (or any of its descendants) changes. Note that a single child_changed event may represent multiple changes to the child. The DataSnapshot passed to the callback will contain the new child contents. For ordering purposes, the callback is also passed a second argument which is a string containing the key of the previous sibling child by sort order, or null if it is the first child.
ref.on('child_changed', function(childSnapshot, prevChildKey) {


child_moved event
Will be triggered when a child's sort order changes such that its position relative to its siblings changes. The DataSnapshot passed to the callback will be for the data of the child that has moved. It is also passed a second argument which is a string containing the key of the previous sibling child by sort order, or null if it is the first child.
ref.on('child_moved', function(childSnapshot, prevChildKey) {



Add on a few subscribers:


database.ref('expenses').on('child_removed', (snapshot)=>{
    console.log(snapshot.key, snapshot.val())
})


database.ref('expenses').on('child_changed', (childSnapshot, prevChildKey) =>{
    console.log( childSnapshot.key, childSnapshot.val())
})


database.ref('expenses').on('child_added', (childSnapshot, prevChildKey) =>{
    console.log( childSnapshot.key, childSnapshot.val())
})

** Child Added fires one time for all data already at the location 

Able to easily figure out whats changes rather than looking through everything and manually figuring out the things that have changed 


*/




/*

------------------ FIREBASE WITH REDUX ---------------------------

--------------- ASYNCROUNUS REDUX ACTIONS -----------

Allow us to run some additional code when change the redux store that is where we are going to use the FB methods to update FBDB, so when someone dispatchs a async action we can update the redux store and FBDB keeping ui and DB synced 


---------- CreateExpense Page --------------------

We are going to change this page so it will save the new expense to FB and then going to do the redux action generator, this will make sure the data gets saved and added to the redux store 

Where to put the firebase code in the app? Can put it in each component like create, edit, but Should the components be communicating with FB? NO. The components do NOT need to have communication with FB, and they should even know that FB is the DB. The components should be unaware of where the data is coming from and where its going b/c this is not the concern of the component, they should just be concerned with the presentation and basic UI.

So going to abstract all FB code away from components and any of the component files, instead we are going to change our redux actions!

Open actions folder, the filters actions will never integrate with FB it is the expenses actions

Need to tweak how our action generators work. So far with the expenses actions it does the steps

Synchronous 
1) component calls action generators
2) action generator returns object, one below or one of the ones in the filters file
3) component takes that object and passes it to dispatch
4) redux store runs reducers and it changes 

Async
1) component calls action generators
2) action generator will return a function (withh thunk)
3) component takes what ever returns from that function and passes it to dispatch, dispatching a function
    - Need redux middleware to make this possible since it need an object by default 
4) function runs: when we do dipatch the function redux will internally execute the function and this will allow the function to do whatever it wants, where we put FB code then have the ability to dispatch a standard action that returns an object and that will manipulate the redux store 


Need to add the new middleware = redux-thunk = this only adds support for dispathing functions

Need to install AND make changes to redux store configureStore.js to integrate redix-thunk

In the configure store file, get new redux item applyMiddleware and import thunk from 'redux-thunk';

Without using the devtools extention this would be a lot easier, the second argumnet would be a call toapplyMiddleware passing in all middleware in, just one piece in this case, (thunk)

export default () => {
    const store = createStore(combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer,
        })
    , applyMiddleware(thunk))};
    return store
}

We would lose the dev tools and its functionality tho so need to add in more code. Create a const composeEnhancers and get its value from window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

Only going to use that line if it exists so just logical OR operator || and attach the regular compose function that we need to import from 'redux

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

So IF using devtools it will get set up correcrtly and if not then wont worry about it and use compose. SO we just wrap applyMiddleware in a call to composeEnhancers

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
};



NOW in firebase.js we are just going to export two things:
1) firebase - just in case want to use firebase can just import this file 
2) database variable - shortcut to the database 

export { firebase, database as default };

name export firebase and default is database



Got everyrhing set up in config store and firebase moving on to actions/expenses.js

Add a NEW export startAddExpense. addExpense has an object dispatched, this will actually change the Redux store, BUT startAddExpense will just start that process off and then dispatch the addExpense inside of the function which will keep changing the store 

startAddExpense is what returns the thing that gets dispatched, in the past we have always implicitly returned objects, here we are going to return a function. The function gets called internally by redux and called with (dispatch) this gives us access to dispatch so we can use inside of the function (writing data to FB, waiting for data to sync, then use dispatch to dispatch addExpense making sure redux store makes those changes too)

SO since we are saving to FB in this new function that means we want to restructure addExpense to instead of having the defaults up in addExpense we want to shift those down to the new function. A NEW/Different way of setting up the data, can just structure like we did already as well, but we are going to destructure expenseData

So if we get some expenseData and if not set to an empty object 
(expenseData = {}), THEN in the return function (thunk enabled) we destructure the expenseData. Make the expenseData connecting from the = expenseData at the end of the destructuring chain, it is identical to what we normally do but it is a bit easier to read. Can also just drag the current way of setting up defaults as well but harder to read

export const startAddExpense = (expenseData = {}) =>{
    return (dispatch) =>{
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0,
        } = expenseData
    };
}

AND then the normal addExpense function can get a lot more simple since setting up default in the new function, so can delete all of the presets in the normal addeExpense function

Now what we are going to do s actually save some data going to import FB and use .push() to actua;ly save some data so need to import FB database from above so we can actually use database.ref('expenses').push({}). We are trying to push on an expense object. Going to make a variable for the object to push with the four data properties on that expense.

const expense = { decription, note, amount, createdAt };

database.ref('expenses').push(expense).then(()=>{

})

So far startAddExpense runs, gets the expenseData or default data, and then push it to FB, and then need to dispatch the regular redux action from above otherwise the redux store will never be in sync with FB. So we dispatch(addExpense(object)) passing in the object into addExpense. 

database.ref('expenses').push(expense).then(()=>{
    dispatch(addExpense(expense))
});

BUT the ID from above is getting created by uuid() but now we have one from FB so we can simplify the code a lot. So we refactor addExpense. Can just pass in expense that it is being called with in startAddExpense instead of setting up the default AND instead of creating the object below on expense we can just put expense: expense or just expense for ES6 shorthand.

FROM: 

export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0,
    } = {}
    ) =>({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description: description,
        note: note,
        amount,
        createdAt
    }
});



TO:

export const addExpense = (expense) =>({
    type: 'ADD_EXPENSE',
    expense
});


 On this we do need to add the ID as well but the good news is that .then() CB success case from .push(expense) get called with the reference. So we can access the reference by passing in (ref) into the .then((ref)=>{}) call as an argumnet and do something meaningful with it, define our object that we are passing into addExpense setting the id property to ref.key (key comes from the FB usage), and then tack on all of the other properties of expense by spreading them out

database.ref('expenses').push(expense).then((ref)=>{
    dispatch(addExpense({
        id: ref.id,
        ...expense
    }))
});


NOW just need to make sure we dispatch startAddExpense instead of dispatching addExpense in all of the places in the createExpense component


SO by using thunk we were able to create async actions that will do something first, something async which is a FB call and then dispatch the redux action after the async call to change the redux store 


*/



/*

------------------- TESTING THE CHANGES WE MADE WITH JEST ---------------


Needed to change the test case in createExpense b/c the prop now needs to be startAddExpense


Need to change test case in actions.expenses.test.js b/c now the "should set up default addExpense action object" test is obsolete b.c setting up the defaults is now the job of the new startAddExpense, and only need one test the "should setup add expense action object with provided values"

Currently we are passin in an object with no ID in the test case but FB is actually setting an ID to the expense object when it gets passed in and used, so instead of creating dummy data and passing it in we can just get the data from a fixture b/c it has an id on it 

FROM:

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


TO:


test('should setup add expense action object with provided values', () =>{
    
    const action = addExpense(expenses[0])

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});



NOW need to add a new test case for startAddExpense 

1) should add expense to DB and store
- Here we care that the FBDB was successfully updatd, and that the correct action was dispatched. There is a test module for the redux store that makes it possible to mock something to see if an action was dispatched to the redux store 
- redux-mock-store = let you spin up mock store, use it in test cases, and look at what actions were dispatched to it 
    A) Install it to deps yarn add redux-mock-store and import configureMockStore AND thunk b.c if we are going to use it it needs the same middleWare 
    B) Use the configureMockStore function - store in a global variable createMockStore - here we are creating configuration so the test cases can create the mock store . In the argumnet for configureMockStore() we are able to pass in an array of any middleware that we want to use 
        const createMockStore = configureMockStore([thunk])

    C) Actually create a mock store in test by creating const store calling createMockStore and for this one we are going to pass in the degfault data an empty object - Now we can actually use store.dispatch on it to dispatch our async action
    D) Now we can actually use store.dispatch on it to dispatch our async action. Import async store action startAddExpense, and use it in the store.dispatch(startAddExpense( 4 attributes )) call
        - Need to pass in the 4 attributes into description, amount, createdAt, note, so create a const and put an object on it with those properties 
        const expenseData = {
            description: 'Mouse',
            amount: 3000 ,
            note: This mouse is better,
            createdAt: 1000
        }
store.dispatch(startAddExpense(expenseData))

    E) Now how do we do something once it is done running, we have async code but no way to set up async test case: Goal is to wait for everything to complete, wait for the FB call to actually finish, and once all of that happens then and only then can we make the assertions = promise chaining to do multiple things per promise. The second .then() call gets no data passed to it unless we return seomthing from the first .then() call 
        - SO we need to actually add a RETURN before the database.ref('expenses).push(expense)..... line in actions/expenses.js so it will return all of that stuff that comes back from that line so we can toss on another .then() and have access to that data. We dont put the new .then() in the actions/expenses.js file since we want to judge it in the test file but by returning the promise chain we can continue chaining on in the test file
    F) Now we can make assertions knowing that data should have been saved to FB and the action should then have been dispatched b/c the action is waiting for the async call to FB to run. So we chain on another .then() onto 
        store.dispatch(startAddExpense(expenseData)).then(()=>{})
    
        - But when we are working with async test cases in jest we need to tell it that it is async, if not it will go thru the original function and if no error returns it passes, the problem is that the store.dispatch..... code doesnt run until long after the test case returns since its async, need to wait for FB, and do all of that and then the store.dispatch function gets called.

        - SO to tell jest to wait for something we need to provide an argumnet in the OG function - (done)
        - SO the test case wont be a success or failure until AFTER we call done() so we can add it after all async code 

    G) Need to figure out how we can get all actions dispatched to the mock store: The mock store supports the exact API function calls as the real store does and other things like .getActions() which gets all of the actions that were dispatched to the mock store then make assertions about them 
        - Get all of the actions in that happened on the mock store with const actions = store .getActions(); 
            - This will return an arraty with all of the actions that were dispatched on it. In this case we only expect one action to have been dispatched to the store, if we follow the chain of events the actual object that gets dispatched is 
                dispatch(addExpense({
                id: ref.key,
                ...expense 
                })
            - This is the only time we change the store so we just expect one action to show up in the array 
    H) Make assertion about the array that gets returned from  store .getActions() to check if that one action is on it - addExpense. Expect the first and only action on the array toEqual the action object of addExpense wth the type of 'ADD_EXPENSE' and a property expense that is equal to all of the dummy expenseData with an id: on it as well 

    expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })

    I) NOW need to make another assertion to fetch data from FB to see if the data was actually saved over there. Need access to DB to import DB from ../firebase/firebase.js. Then can actually query the DB to make sure that it was actually stored correctly by accessing database.ref() - the goal here is to figure out how we can get the individual epxnese. 
        - template string in ref() - start off with 'expenses/ID' need to pass the ID in and have access to that since we have access to the complete action object so `expenses/${actions[0].expense.id}` - this is the id generated by FB and can use to fetch that item
        - chain on .once('value') to get that value a single time and attach a .then() listener and provide the function and make assertion about the data
        - inside .then we need to get the snapshot and when we get it we convert to an actual value and make an assertion that it should equal all of the dummy data above

        .then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseData)
        }) 

    J) Since this new callback is async too we need to take done() and put it inside there to make sure we wait for it 


test('should add expense to DB and store', (done) =>{
    const store = createMockStore({});
    
    const expenseData =  {
        description: 'Mouse',
        amount: 3000 ,
        note: 'This mouse is better',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });


        database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) =>{
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});




This is a lot of callback nesting so we can refactor this with promise chaining.

In a promise chain:

We can return nothing, the next .then() will fire but with no info passed in 

We can return a value that the next .thn() will have access to 

We can also return another promise - if we return a promise the next .then() CB is that promises success case - the RETURN keyword is important before the promise, if it is there the next .then() will be its success case and will only run when that promise actually resolves and if it is NOT than it will not be 

This reduces needs for nested callbacks. To integrate this in the code

We are going to return a promise from the first .then()'s function SO we take the second .then() and everything after it and cut it out
        .then((snapshot) =>{
            expect(snapshot.val()).toEqual(expenseData);
            done();

database.ref(`expenses/${actions[0].expense.id}`).once('value') - this line at its core is the second promise 

SO we need to put a return in the front of that line 
return database.ref(`expenses/${actions[0].expense.id}`).once('value')

Then take the second .then() code and paste it onto the end of the returned promise. This gives exact same funcitonality that is a bit easier to read



2) should add expense to DB and store with defaults
Copy/paste all of code, and change to default values in dummy data and rename variable and switch variable names out



*/



/*
---------------- CREATING A TEST DATABASE -------------------

In all of the tests above we were writing to the actual DB for the app so we need to create a test DB to run with our tests with all of the CRUD ops b.c we are going to need test data to fetch, remove, etc and will be constatnly wiping the database 


In the firebase file all of the config properties will be changes to variables and if in production we will use one DB and if in dev than the other DB 

There is an environment variable that we need to get and manipulate to get this done = process.env.NODE_ENV - this is environment vari that stores the env that you are currently in, this is auto set for us in Heroku equal to 'production' so we need to be able to set this in our test env with either "test"(for test) "production"(for prod) "undefined"(for dev)

So we are going to change the test script in package.json. No crossOS script to run on all OS's so going to use an NPM module that will allow us to set the environment variable regardless of OS = NPM cross-env

1) Need to install yarn add --dev cross-env@latest
    - --dev flag b/c only using for the test script 

2) integrate into package.json in the "test" script
    - Upfront we need to run the tool so add cross-env and before the jest cmnd we can set up a bunch of environment variables using KEY=value -> NODE_ENV='test'
    - This is the only one that needs to change b/c this is auto set by Heroku as "production", and it will be left off so undefined if development
3) Take advantage of the NODE_ENV variable in webpack.config. Above the function access process.env.NODE_ENV and set equal to itself OR if it doenst exist set it to the string 'development'
    - This will be the string production on heroku / test in test environment // and development if neiher of those
4) Add conditional logic to what the variable process.env.NODE_ENV is set equal to

    if(process.env.NODE_ENV === 'test'){

    }else if(process.env.NODE_ENV === 'development'){
        
    }

BUT we are not going to put values right inside the conditioal logic b/c we are giving them all the secrets like apiKey etc , so going to create two seperate files that will be in .gitignore and will read those files in in the conditional statements

5) In the root dir make two new files .env.test (for test env variables) and .env.development (heroku sets for production)

6) In env.development - take all of the properties on the config object in firebase.js and copy/paste them over 
    - Need to set up those KEY=value pairs again, set up env variables (just like NODE_ENV), but setting it up for these properties. Prefix all with FIREBASE_API_KEY and then cut/pasting the values over to the new property using the = not : b/c we are using the = no quotes! Just the value so no "string" 

7) Copy/paste all over to the .env.test and then change values to point to a different DB
8) Create new FBDB and get its config object
9) Go to the rules and allow all access by setting .read and .write to true in the rules
10) Add to the webpage to get the new config object and swap out all values
11) Install dotenv - which just reads the .env files and sets up process.env.allValuesInTheCorrectfile
    - yarn add dotenv
12) Now add it into the if statments in webpack.config to run this code if and only if we are in the correct environment. In the first if statement for 'test' environment
    require('dotenv') - this returns an object with a .config() method which we have to pass in our options object - by default it looks for an .env file and we have multiple so we need to set up its path: property setting it equal to the file name
        require('dotenv').config({path: '.env.test'});

Now all of the .env file variables will get read and set on process.env BUT the NODE_ENV variable do not get passed to the client side JS b/c it would create a lof of security issues. SO need to manually pass them through. Pass 6 vaules down to client side JS in bundle.js

13) We are going to be using a built in webpack plugin to get this done. In the plugins array after CSSExtract we put
    new webpack.DefinePlugin -- this lets us define an object we can define the variables we want to pass though 
14) Need to require webpack at the top of file since we are using it now
    const webpack = require('webpack');
15) In DefinePlugin - need to provude the thing we are trying to define in quotes 
    'process.env.FIREBASE_API_KEY'   this is the vairable we are going to be setting in the client side JS and going to get its value from the same variable but in the NODE environment
        'process.env.FIREBASE_API_KEY': process.env.FIREBASE_API_KEY

16) This alone WONT work b/c how DefinePlugin works - if take process.env.FIREBASE_API_KEY and replace it in the firebaseConfig object in firebase.js and refernce that variable in the apiKey: property , 

        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            ...firebaseConfig
        };

the DefinePlugin will look around our project for "process.env.FIREBASE_API_KEY" and it will do a find/replace and it will replace that apiKey: string with the process.env.FIREBASE_API_KEY value which means that the value of process.env.FIREBASE_API_KEY (the string stored in that variable ) will not actually get set. So if the string 'test' is the value of "process.env.FIREBASE_API_KEY"

        "process.env.FIREBASE_API_KEY": 'test'

DefinePlugin will replace process.env.FIREBASE_API_KEY with test - the content of the string, not the string itself so it will set the apiKey:  to test NOT 'test'

    const firebaseConfig = {
                apiKey: test,
                ...firebaseConfig
            };
BUT we want it to set it to the string test NOT access the test variable 

   const firebaseConfig = {
            apiKey: "test",
            ...firebaseConfig
        };

SO need to add two sets of quotes  "process.env.FIREBASE_API_KEY": "'test'"

Can call JSON.stringify() method that will automatcially add the second set of quotes 

        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY)

17) Do this for all other variables that we want to pass through
    new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY" : JSON.stringify(process.env.FIREBASE_API_KEY),
        "process.env.FIREBASE_AUTH_DOMAIN" : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        "process.env.FIREBASE_DATABASE_URL" : JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        "process.env.FIREBASE_PROJECT_ID" : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        "process.env.FIREBASE_STORAGE_BUCKET" : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        "process.env.FIREBASE_MESSAGING_SENDER_ID" : JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        "process.env.FIREBASE_APP_ID" : JSON.stringify(process.env.FIREBASE_APP_ID),
    })

18) Still not using these values SO in the firebase.js firebaseConfig object we need to do the exact same thing
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: "G-LS6WEZ0REY"
        };
Now we are correctly setting/using the env variables. This will only work for the dev setup b/c one more changes needs to be done for test setup 

19) In jest.config file need to add one thing on the object 'setupFiles': - this is an array of files to run to set up the test cases. We are going to be using this to grab the env variables 
    - Set 'setupFiles': equal to the path - have access to a special pattern <rootDir> which Jest repalces with the root dir of the app and add "<rootDir>/src/tests/setupTests.js"
20) We already have this setupTests.js file in src/tests it was created when we originally set up Enzyme to work with the Enzyme adapter 
    - Just need to import dotenv and run this line
    import DotEnv from 'dotenv';
    DotEnv.config({path: '.env.test'});


To TEST: Wipe both DBs and run test cmnd in terminal 

yarn test  --watch 

And hopefully the test data gest added to the test DB and not the regular one 

----------- SETTING UP HEROKU ENVIRONMENT VARIABLES --------

NONE of the code above runs on production - we made sure of it with the if statments in webpack.config. IF we do want to set up production variables we need to use the Heroku CLI which allows us to set up variables on process.env, NODE_ENV is automatically set for us equal to the string 'production' but for the other ones we used in the firebaseConfig object we need to set them up manually otherwise when we try to use them in the DefinePlugin we will be passing in undefined values to the client side JS when heroku runs webpack

SO we need to take everyting fron the .env.development file and put it into a command 

Series of Heroku cmnds to manage our heroku configuration

heroku config - prints out all environment variables none to start 

heroku config:set KEY=value - this sets an environment variable using the KEY=value pairs 

heroku config:unset KEY - this will remove the environment varible with they key as KEY

so need to run:

heroku config:set FIREBASE_API_KEY=AIzaSyCtFjuKgzocwZOZKnhvZHyYj0mbh8fPEZs
heroku config:set FIREBASE_AUTH_DOMAIN=overhead-2399c.firebaseapp.com
heroku config:set FIREBASE_DATABASE_URL=https://overhead-2399c-default-rtdb.firebaseio.com
heroku config:set FIREBASE_PROJECT_ID=overhead-2399c
heroku config:set FIREBASE_STORAGE_BUCKET=overhead-2399c.appspot.com
heroku config:set FIREBASE_MESSAGING_SENDER_ID=523996820157
heroku config:set FIREBASE_APP_ID=1:523996820157:web:3cddc928fd1b3cf7ce3dd4
heroku config:set FIREBASE_MEASUREMENT_ID=G-LS6WEZ0REY



NOW deloying to heroku will actually work - without setting up the environmet variables it wouldnt have

*/



/*

------------- FETCH EXISTING EXPENSES FROM FBDB ---------------

Create some test data in the tests/actions/expenses.test.js file. Here we are actually interacting with FB so create some expenses here in the lifecycle method beforeEach(()); to write some data to FB. Can just loop over the expenses fixtures array, add a new item onto dummyExpenses for each one and set it to FB

.forEach to loop thru expenses destructuring the argumnets to pass in for each expense. For each expense in the array we are trying to set the value of the id equal to the object with all other properties on it since that is the way we are storing it in FB. Trying to set the value of the id variable so NEED TO use bracket syntax and set it equal to an object with all of the destructured values set to their name so we can use ES6 shorthand syntax and only provide the name and not description: description just description

This is related to JavaScript itself. If you have a dynamic property value whose value is stored in a variable, you must use the bracket notation to be able to access it.

const key = "name"
obj[key] // Gets the "name" property on the "obj" object (what we want)
 
obj.key // Get the "key" property on the "obj" object (not what we want)

dummyExpenses[id]


beforeEach((done)=>{
    const dummyExpenses = {};
    expenses.forEach(({ id, description, note, amount, createdAt })=>{
        dummyExpenses[id] = { description, note, amount, createdAt }
    })
    database.ref('expenses').set(dummyExpenses).then(()=> done())
});


BUT as of right now beforeEach() is not going to wait for database.ref().set() to complete before it runs the test cases. To fix this we can use done, chain it onto the .set() promise with a .then to call done() when we have set the data to FB


Now that we have dummy data go into actions/expenses.js going to be adding two new exports:

1) Actual thing that changes redux store -- SET_EXPENSES -- to set array value, get array back from FB, set it and done 

    A) Arrow function implicitly return an object with a type: SET_EXPENSES on it and provide the data expenses and put in on the expenses property so ES6 shorthand expenses: expenses

    const setExpenses = (expenses) => ({
        type: "SET_EXPENSES",
        expenses
    })

    B) Add test case to make sure we get uniform structure back. Have the expenses value set the to expenses from above with shorthand
        test('should setup SET_EXPENSE action object with data', () =>{
          const action = setExpenses(expenses);
            expense(action).toEqual({
                type: 'SET_EXPENSES',
                expenses
            })
        })

    C) NOW time to actually handle this action in the reducers file
        - set up a new case in the reducers file for SET_EXPENSES this is going to wipe the state and reaplce it with all expenses that are passed into the reducer, completly setting the expense array 
        - just need to return the action.expenses b/c we do not care about the state at all, designed to set expenses arry completly
    
        D) Add test case: define an action object with type:'SET_EXPENSES', expenses: {one expenese}
            - now call the expenseReducer passing in all expense fixutres as the state and the action about and expect that the state is going to equal just that one expense not the whole expense fixtures array



2) Async action responsible for fetching data to FB -- START_SET_EXPENSES - this is what actually fetchs the data and eventually dispatchs SET_EXPENSES 
    A) In app.js we are able to show a loading screen with async actions b/c startSetExpenses() returns a promise so we can chain a .then() on then to render something else once the async promise goes thru

    ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

    store.dispatch(startSetExpenses()).then(()=>{
        ReactDOM.render(jsx, document.getElementById('app'))
    })

    B) Arrow function with no argumnets, so return our function, this function is the function that has access to dispatch. We first need to put return at the beginning, this is what allows us to put .then() in the app.js where we actually dispatch things and rerender the scren. Then we need to fetch with FB using database (alrdy imported).ref('expenses').once('value') access a single time the data .then() add on success case passing in snapshot that is given back from .once() and we need to parse the data from snapshot putting it in an array structure not an object structure. 
    C) declare an empty arry and use the snapshot.forEach method with each childsnapshot to push each childsnapshot onto the array in the correct form. The correct form you need to access the childsnapshot key property which was created by FB and set it to the property id: and then spread out the rest of the childsnapshot.val() object 
    D) Have access to build up expenses arry now and just need to dispatch setExpenses passing in what it expects, an array of expenese 


    E) Create a new test case for it. Just like all test cases that take advantage of the async request we need to create the mock store createmockstore, go thru process about making the request and assert something about one of the actions that were disptched, no need to query FBDB inside test case b/c dont expect it to change at all

        1) Create mock store const store = createMockStore() passing in NO data b/c dont need it 
        2) import startSetExpenses and store.dispatch(startSetExpenses()) with no arguments b/c doesnt take any
        3) Add done() to the file to tell jest not to make any assertions until it is called b/c async request
        4) now make assertions after the the data is fetched .then(()=>{})
        5) get the actions that were called with store.getActions();
        6) expect the action at the 0 index to equal an obect with tyope: 'SET_EXPENSES, AND that all of the seed data from the fixtures file has been correctly added to the expenses property and has them on it since that is the exact same data we set on FB in the beforeEach()
            type: "SET_EXPENSES",
            expenses
        7) Call done()



*/





/**
 
------------------ REMOVE EXPENSES -------------

Create an async action that wipes the data from FBDB and wipes it from redux, similar to add and fetch


//START_REMOVE_EXPENSE
export const startRemoveExpense = ( { id }) =>{
    return (dispatch) =>{
        return database.ref(`expenses/${id}`).remove().then((ref)=>{
            dispatch(removeExpense({id: id}))
        })
    }
}
 change everywhere removeExpense is used in editExpense component to startRemoveExpense

 In the test case we need to set it up like normal and check the mock store but then we need to check the FBDB as well to make sure the expense was in fact removed by accessing its snapshot to make sure it doesnt exist b/c using .val() on a snapshot that doesnt exist you will get null back so can expect the .val() toBeFalsy();

 This is for the redux store:

  test('should setup startRemoveExpense and dispatch removeExpense', (done) =>{
    const store = createMockStore();
    store.dispatch(startRemoveExpense({id: expenses[0].id})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id: expenses[0].id
        });

This is for the FBDB:


  return database.ref(`expenses/${id}`).once('value').then((snapshot)=>{
            expect(snapshot.val()).toBeFalsy();
            done();


------------------- EDIT EXPENSES -------------

Go through the same steps need to look for eact expense in FBDB using the id passed in as argumnet, using .update passing in the updates vaiable adding a .then call to dispatch edit expense to change redux. Need to add return at the beginnging of the database call


MAke test case define updates (can just be one value or whole object) and the id, use store to dispatch startEditEpense passing in the id, updates and chain on a .then to do something after the data is synced now make sure everything actually happened by making assertion about the action and what it was called with type, id, updates defined above

make sure data changed on FB bu fatching data and looking at value 


 */


/*
 ------------------ USER ACCOUNTS AND AUTHENTIFICATION -------------

 Data assco with user accounts

----------------- CREATING LOGIN PAGE --------------------------

FB provides us with methods to use for auth/login/out but we need to create a login-out page/button so need to create a login page component that will be shown at root of app and move the dashboard component to /dashboard since it wont be the first page 

1) Create the LoginPage component as stateless functional comp
2) In AppRouter change the routes to '/' to login and '/dashboard' to dashboard
3) Make snapshot test of loginpage and change header snapashot over 

--------------------- AUTHENTIFICATION ------------

-------------------------------- LOGGING IN -------------
Need to enable authentification in the FB dashboard 
1) Authentication sign-in method - google
2) In firebase.js need to add another thing creating an instance of a PROVIDER - A provider is a way to provide authentication - google/fb/github/etc one -just using google here 
    - create a const googleAuthProvider set equal to an instance of a new provider with no argumnet (we can have github provider to authenticate with github )
    - in docs/reference/web reference/firebase.auth
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
3) We are ready to start authenticating - export googleAuthProvider as named export 
4) Focus on making somesort of function call that will start auth process
5) First we want to see how we can track authentication - would be nice to know if auth worked/failed depending, so inside app.js add some code that will run some callback if FB actually logs in or if user logs out, will refactor and move this stuff around later 
    - import firebase in app.js and below access firebase.auth() calling as function to get all authentication realted funcitonality which has a method .onAuthStateChanged(CBF) - this runs the CBF when auth state is changed, in the CBF the 'user' is provided as the first argumnet, so if we want to confim if there is a user we can set up if(user){} statement - if there is a user we know they just logged in and else(){} for if there is no user we know they just logged out 

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
            console.log('logged in')
        } else{
            console.log('logged out')
        }
    })

    - setting this up first to make sure that the code we are writing actually triggers the authentification realated functionality and we see the C.Ls to the screen 
6) Now actually make a call to log into a google account in the login page component AND a new action to handle it src/actions/auth.js, start off with one thing that we export that we will be adding more onto later - this function will return another function so this will be async action in the second function is where we will get access to dispatch. Inside we are trying to call a firebase realted method so need to import a reference to firebase and the googleAuthProvider
    - With an Auth Provider we create the auth provider and then we pass it into a function and this is what starts the process
    A) return inside the second function to continue the promise chain allowing others to attach onto it, access firebase calling auth() on it and using the method .signInWithPopup() - this method takes the provider as the first and only arugment googleAuthProvider - i want to sign into my account and use popup system and want to log in with google realted services 

        export const startLogin = () =>{
            return (dipsatch) =>{
                return firebase.auth().signInWithProvider(googleAuthProvider);
            }
        }
    B) Now this file is done and we just need to wire up the LoginPage popup button to actually fire this component, and then once wired up we can test out function
    C) Inside LoginPage page file using connect() and the new action we just created. B/c this is an action and we want to dispatch the action we need to connect(undefined, mapDispatchToProps) to get dispatch and want to dispatch something
        1) mapDispatchToProps = (dispatch) and implicitly return an object with one prop startLogin that is set to a value of an arrow function that implicitly returns a dispatch call to startLogin 
        2) Wire up connect with a default export with undefined as the first arugment
        3) Wire up the onClick for the button destructuring the startLogin prop in the arugment of the component and referenceing it in the JSX
        4) make sure importing default function in AppRouter 
7) Now should be able to test this out by running dev server and refresh onto login page - in console we see that the function that is keeping track of the state of authentication has already fired since when we first visit the app firebase in the browser tries to communicate with the servers to see if we are already logged in, if we are than we can view prvt data - use the login button with google acct and see logged in in console so its working - by default now we are still logged in if refresh page it will stay logged in
8) 




--------------- LOGGING OUT ---------------

1) Make logout button inside of header component since this will contain our private navigation once someone is signed in
2) Need to create an async action to be able to signout in the actions/auth that is the same as signin
3) Wire up header to use it like above with connect....


---------- TEST CASES FOR AUTH ---------------

Need to switch up header test case b/c now it is a connected component so we need to pass in the startLogout as a prop and make a spy to make sure it fires and update snapshot

Need to make sure we are exporting Header/Login Page as a named function as well as the default to be able to test the unconnected header component

Need to seperate the snapshot and button click toHaveBeenCalled spy test into two different test cases b/c the button click will return a promise which will then take the place of the MockFunction (spy) in the snapshot and fail the snapshot

----------------- WHAT DO WE DO WHEN LOGIN/LOGOUT --------
Need to focus on the functon in app.js to get more appropriate things to do when login/logout.

When login we want to redirect to the dashboard, and fetch their expenses and logout redirect to login page

Redirect user using history.push('/') - BUT history is passed into the component b.c that component has a route but the problem is in app.js we are not in a component that has a route we just have some code and want to access the history API -  so to get the history API outside of a component we are going to make changes to the AppRouter

in AppRouter - by default if we use BrowserRouter behind the scenes React-Router is going some work for us, it is creating an instance of <Browser History/> and it registering it with our new Router BUT we can go thru the process manually, need to install one tool and add a few lines of code but once have that in place we can use it anywhere not just in the context of a component 

1) install the module react-router is already using the behind the scences - npm history yarn add history@4.10.1 (need this b/c latest breacks with current version of react router dom)

2) Use it in the AppRouter: import { createBrowserHistory } from 'history';


3) createBrowserHistory is the function we are going to use to create out own history and make changes to react router once we have created it

4) const history = createBrowserHistory();

5) Currently we are crating this hisotry on our own and not integrating it with our router, we are using BrowserRouter which uses browserrouter history by default SO what we are going to do is SWITCH from <BrowserRouter/> TO the regular <Router/>
    - When we make this switch we are allowed to provide our own hisotry value as a prop named history and seting it equal to the custom hisotry in <Router />
    - NO other changes nessessary just have access to the history variable which we need to export as named
6) Go to app.js and actually import and use the hisotry to redirect accordingly in the in the else() history.path('/')
    - The logout case is easy but with the login page we ned to fetch the right persons expenses
7) Login 
   
    A) When a new user logs in we need to make sure we are actually fetching their expenses so get it done inside of the if() statement by bringing in the store.dispatch(startSetExpenses) lines inside of the if(user){} BUT this will cause them to sit on the loading screen until they login which they cant b/c no login button so need to render the app regardless just not fetch their expenses
        else{
        ReactDOM.render(jsx, document.getElementById('app'))
        history.push('/');
        }

        WITHOUT the async call to get the expenses

        BUT this causes some problems:
        1) duplicate code that we can break into a function call
            A) renderApp()
        2) IF user is already viewing the app and login/logout we dont want to rerender everything, only want to render if we are visiting the app for the FIRST time either one time in the if(user) or the else{}
            A) Create a variable set to a boolean to track if the app has rendered and flip if it has
                let hasRendered = false;
            B) THEN create a function renderApp which will be a function that renders the application but does it CONDITIONALLY only doing it if hasRendered is false. We put in the renderDOM duplicate code there and switch the boolean to true when the conditional code runs
                const renderApp = () =>{
                if(!hasRendered){
                    ReactDOM.render(jsx, document.getElementById('app'));
                    hasRendered = true;}}

            C) Call renderApp below in the authenticated conditional statment


    B) Need to only redirect user when theyre on the login page b/c if logged in and refreshed the page it will auto take them to the dashboard page when they dont want that
        1) Put in an IF statment that only pushes them to the /dashbord if they are onthe login page and can access currecnt location with history.location.pathname === "/"
         if(history.location.pathname === '/'){
                history.push('/dashboard');
            };



------------- CREATING TRULY PRIVATE ROUTES ---------------

As of now logged out users can still visit create/edit pages even if theyre not logged in so we need to set up 

So need to store something in redux correlated with authentification - the user.uid which we have access to from user which is passed in by Firebase user.uid

Than can use the value throughout the app to figure out if we are logged in and as who 

Create a brand new reducer! For authentication auth.js. B/c reducer is actually what does something from the action - need to create an action as well?

Reducer will just be the pure function, as always. The big pic goal is to have the reducer handle the actions, one for logging in and one for logging out.

1) Create and default export the pure function
    A) Need to provide the default state, as an argumnet
        -For our purposes we are going to set state's default to an empty object, which we will add a property on when the user is authenticated and clear the object to an empty object when user is logged out
        - Can store the user.uid as the state which will work but will make it an object just in case want to store other things on the object later on 
    B) Need to provide the action as an argument
        - This is the argument that is being dispatched 
2) Set up switch statement with different cases based off of the action.type
    A) case 'LOGIN: we are going to return the new state which will be an object with uid: as a property with the value we are going to get from action.uid
        - So when dispatch login we have to pass the uid along
    B) case "LOGOUT": just return an empty object
    C) case default which will just return the current state 
3) Since the reducers are set up we need actions to couple them and dispatch them with. Creating functions for action.type: LOGIN and LOGOUT
    A) export named login taking the uid as the argument and implicitly return an object with the type: "LOGIN" and the uid: uid so just uid 
    B) export named logout no argumnet just implicitly returning object with type: "LOGOUT"
4) We have actions in place and reducer in place we just need to connect the reducer to the redux store and then actually dispatch login and logout accordingly. So in the store/configureStore add the auth reducer onto the store and import it
5) Need to disaptch login/logout accordingly in app.js to make sure we have most uptodate info in the store, the id if theyre logged in and nothing if loggd out. These dispatches live inside the onAuthStateChanged if statment, and NOT in the startLogin and startLogout like we have done with other async actions. This is because the onAuthStateChanged callback will also run when a user vistes the website and auto triggers to get set to let us know if were loggedin/out, BUT if we only dispatch login/logout inside the async actions startLogin and startLogout the dispatch(login/logout) will only happen once when the user explicitly logs in and out, and not when they impliclty log in by jsut going to the webpage again while logged in 
    A) Import both actions
    B) Dispatch them by store.disptch(login(user.uid)) passing in the uid as the argumnet
    and no argumnet to dispatch(logout())
    C) Check redux store dev tool to make sure the uid was set and wiped when logout
6) Add test case for actions.logout/login AND for the authReducer
    A) authReducer = two test cases - create new file and import authReducer
        1) test = should set uid for login - need to call the authReducer with the values it needs (state, action)
            A) set up action as object with type: "LOGIN" and uid as random string 'abc123' - this is action object
            B) Now need to pass to the reducer by setting variable state = to calling the reducer passing in the (state, action) to get the new state back - the state argumnet can be an empty object or nothin since it will default to empty object
            C) Expect that uid be on the new state back make assertion expect state.uid === action.uid
        2) test = clear uid with new action object with type:"logout" make a state variable and call to authReducer passing in state and action object.
            A) The state passed into the authReducer HAS to have a uid: prop on it set to make sure it gets wiped clean when the authReducer gets called
            B) then expect tht the new state does not have the uid on it and is an empty object
    B) Actions Auth test cases - need to import {login, logout}
        1) test = should generate login action object - can do this with a mockStore (waht i did ) or without one
            A) Create a uid variable an action variable where we call login(uid) passing in uid then expect the action to equal an object with type:'LOGIN' and uid: uid on it
        2) test = should generate logout action object
            A) Create action variable calling logout() and expect action to be an object with type:"LOUTout" on it
    
*/


/*

----------------- PRIVATE ONLY ROUTES ---------------------

Now that we are storing some authentication related info in the store we can use that info to fugre out if user should be able to nav to certain pages


Going to do this by makign changes to appRouter. Modify how we set up routes, add a few new components that make sure to actually run that check for auth before rendering dashborad/add/edit 

We are going to do the end solution first in AppRouter and then create the things we set up second

1) Import a new component PrivateRoute tht atlives in the app.router dir 
2) Goal is be able to use PrivateRoute instead of Route for those private pages SO switch out Route for the three private pages to PrivateRoute - How is this going to work? We do still need to set up and use <Route />, but it will now be handled with PrivateRoute so when we actually render the <Route /> we can determine what to do by looking at the auth status and se if user is auth for those routes or redirected to login 
3) Create new file PrivateRoute.js in route dir and import react/route, and connect since we are going to use redux store to determine auth
4) Export default connect component with connect and mapStoretoProps:
    A) In mapStoreToProps return an object with isAuthenticated: which will be a boolean true if we are and false if not so we can ternary accessing state.authentification.uid (this is set from the configureStore -> authReducer - > auth Actions) OR flip TWICE !!state.authentification.uid to get the boolean b/c have undefined if not and string if we do have the value and just want boolean
5) Create stateless functional componet: big picture goal is to create an instance of Route that we have abstracted away from AppRouter and pass props into route by spreading out {...props} in the component- doing this the app will still work with no erorr so we can see that the Route is working now just need to add the conditional logic side to it 
    A) In the props passed into PrivateRoute destructure { isAuthenticated, component: Component,  }
        1) { isAuthenticated } - will have the uid stored on it
        2) { component } component was passed in as a prop in the AppRouter component={ExpenseDashboardPage}
            - We are eventually going to be rendering the component and we want an uppercase name for that so RENAME component: Component (a common pattern)
        3) Want to grab the rest of the props like exact,path and still pass then into <Route/> so it works correctly so need to use the REST OPERATOR 

    REST OPERATOR: When created and managing objects we can use the spread operator to spread out all of the properties but can also use the REST operator (...rest) when we are destructuring objects where we define some properties and then ...rest to get a variabel called rest with all of the stuff that we did not destructure on it so all props expect isAuthenticated and component on it. The rest in ...rest is a variable so can switch it to anything ...props ...penis 

            - The rest operator is what we are going to be passing down to <Route {...rest}/> and currently it is NOT getting isAuthenticated passed into it which is good b/c doenst support that but also not getting compoenent which is the component to render. 
            - Going to fix this by defining component on our own as a prop. This is where the conditional logic will come into play of what component to render! Component prop will be equal to an arrow function that will implicitly return some JSX and inside we are going to get conditional work done 

        export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest}) => (
            <Route {...rest} component = {()=>()} />
        );        

        - Now in the component CBF we pass in all of the props that were passed to Route from PrivateRoute which we want to pass thry to the individual component. Now add ternary off of isAuthenticated - if yes than want to get some JSX rendered to the screen which is an instance of Component that we renamed in the PrivateRoute props making sure that we pass it the other props  - the ones that its currently getting when we are using Route but that it is no longer getting when we define it like this (things like history) by spreading out the props that are getting passed into the CBF

            IF not authenticated we need to redirect them which we can do with a component <Redirect /> (need to import from react-router-dom) that is given to us from react-router-dom. Create instance of <Redirect /> setting the to="/" prop to the login page

        component = {(props)=>(
            isAuthenticated ? (<Component {...props}/> ) : (
                <Redirect to="/" /> 
            )
        )}

        NOW when logged out and click the prvt pages we cannot visit them
6) Render Header just on those private routes so not everyone can see it SO take it out of AppRouter and import into privateRoute and render <Header /> in the ternary for isAuthenticated wrapping the <Component/> in a wrapper <div>
        isAuthenticated ? (
                    <div>
                        <Header />
                        <Component {...props} />
                    </div>

*/




/**
 

------------- PUBLIC ONLY PAGES ----------------

Still able to get to the login page when a person is logged in still (not in mine though?)

Going to fix this is the same way we did the PrivateRoutes 

Do exact same thing as private copy/paste code but switch up the ternary  so if they are authenticated they get redirected to the dashboard when trying to visit a public page


Can change all path='/' to path='/dashboard' instead of this as well in all of the components where they redirect after submitting or doing something but this is a nice way to make sure


 */


/*
-------- PRIVATE FIREBASE DATA PER USER ----------

Each user will have a little part of the DB they can manage

Useing the FB rules to secure it and splitting up all expenses that are in the root of the DB depending on user

Now the users will be key in the root with object with id's as value and each id will have an expenses object 

In src/actions/expenses is where we write to the ref(expenses ), we want to switch this up incorporating the userID in all async actions in this file 
1) Change the ref('expenses') in startAddExpense to ref(`users/someUID/expenses`) with this we are crating an expenses object inside the users part of the DB  
2) BUT we need to get the someUID somehow, so we add a second argumnet onto the returned function :    
        return (dispatch) =>{
    - When we have these THUNKED actions the async actions these get called with dispatch AND GETSTATE      return (dispatch, getState) =>{
    - We can call getState to get the current state and use it right inside the function by making variable uid and setting equal to calling getState() then accessing on the state .authentication.uid which will give us the uid
        ref(`users/${uid}/expenses`

        now added in the correct place 
3) Need to do the same thing for all other async actions in the actions file
4) Change the test files for all of them - need to make changes to actions/expenses.test.js
    A) Make changes to where we are writing data, currently we are writing to the root of the DB which will be a problem b/c all of the async actions we are testing expect it to be somewhere else, so need to create a fake const uid = 'thisismytestuid'
    B) In BeforeEach()make sure that we are referenceing the database to the correct location now in `users/${uid}/expenses
    C) Now need to change all the test cases that actually communicate with FB to check if they were CRUD'd to reference the right spot to make sure querying from the correct place we ALSO need to make sure there is a uid set in the store
    D) Place an object in the createMockStore to be able to access it. The auth:{} object will have a property uid: uid to make sure startRemoveExpense and others have the correct stuff needed to do the test case
    E) Going to use { auth: { uid }} everywhere so break out into own variable defaultAuthState
    F) Even in the fetch case we need to pass the defaultAuthSTate

        test('should fetch the expenses from FB', (done)=>{
            const store = createMockStore(defaultAuthState);




The whole database is still readable by anyone in the rules its just set to true 
So need to lock down the data in the rules to make data private unless you have the user.id that it was written under 

In FB rules page changing read/write to false so by default no one can read/write to the FBDB, 

Then we are going to allow ppl to read and write but only to specific parts of the DB

1) Define "users":{} in the rules object below ".write" - Here we want to get the nested stuff like the space where the particular user's id comes into play - but we cant just name the ID since its different for each user we need a way to get the id in a variable
    A) In FBDB we define variable by "$variable" = "$user_id" - this is going to be dynamic it will match everything inside of users and going to be able to set up rules for those things
    B) On the "$user_id" make an object as its value and define ".read" and ".write" in side there setting the values to a conditional to make sure the authenticated users id is the same as "$user_id" if it is the user is trying to read/write to their part of the DB and not then not their part
        - Add the check "$user_id === auth.uid" - we do have access to auth and the uid that is on it 
        - have rules in place now that only user that is logged in can CRUD the data 
    C) Publish. As build different apps take advantage of the rules playground cause have trouble testing all edge cases
        - Play with playground and Authenticated with the different paths, no one can read/write to the root but to their data inside users/uid(that is provided) - yes they can if Authenticated
By doing this we have restricted users to only their data 
*/

/*

------------- ADDING DATA VALIDATION TO FIREBASE -------

Yes we have client side validation but we also need to validate right before the data is written b/c someone might bypass the UI and write unvalidataed data to the DB 

Want clientside and server side validation 



Start process inside the FB rules:

1) Define another property on "$user_id" as "expenses" . This is where we are going to define any validation rules for individual expenses - setting it equal to an object and if trying to validate the individual expense we create another object with the key "$expense_id" - since this property will be dynamic use like the "$user_id"

    -On this key we define validation rules in another object 
    - FB supports a few validators - learn more at references/security/databaseRules like .isNumber() .isStinrg() etc there are operators too like add/sub and string methods/properties like .length / contains/ begins with .toUpperCase etc
    1) Add on ".validate" and start to use the the rules .validate methods
        A) newData.hasChildren() - newData is a variable that we have access to in the rules so we can access it to make assertions about the newData - can assert the new expense has the given children passing in an single quote list in an array of all things we want to exist
            - "newData.hasChildren(['description', 'note','createdAt','amount']),
        B) Now setting up validators for those individual things by naming the expense property and setting it to an object where we put the validators

            1) "description": {
                ".validate": "newData.isString() && newData.val().length > 0"
                }
            - This one needs to have a non empty value so need to check the length of this value to make sure its no but cant do it right on newData need to gets its .val() and check it 

            2) "note": {
                ".validate": "newData.isString()"
            }

            3)"amount": {
                ".validate": "newData.isNumber()"
            }

            4)"createdAt": {
                ".validate": "newData.isNumber()"
            }

            5)"$other": {
                ".validate": false
            }
            - This one is to make sure that if it is not one of the ones defined up above than not allow it 

2) Define another property on "$user_id" as "$other" - this is going to make sure the user doesnt add other stuff, just expenses 
    - Here when we use the $ we are creating a 'catch-all', all other places of using the $ we are only using it ONCE (an only child) BUT when we use it AFTER other properties we are saying for "$expenses" - do this and for everything else "$other" - do this 
    - Inside "$other" we are going to invalidate the data regardless of what it is so set it to an object with the property ".validate": and have a lot of options here true/false/and a lof other conditionals , but we are setting it to false to say her even if you are logged in as the correct user the only thing you can write is expenses
    - can play with this in the playground by adding the correct user_id/test(or whatever) and try to read or write it shouldnt work b/c it needs to be user_id/expenses

3) Now publish the changes and play around with the playground to make sure you got all edge cases covered





----------------- HEROKU AUTHENTICATION -----------
Need to enable authentification for Heroku in FB in Authentication/Sign-in method/Authroized domains so if we are deploying to a real URL like heroku we need to set that up otherwise if we do try to log in it will fail to log in

Add the app's url to the authorized domain section




*/


/*

------------- BABEL POLYFILL ------------

For support in older browsers - (browser stack is good to emulate other browsers but expensive)

Add in methods and stuff that older browsers odont have

yarn add babel-polyfill

THEN in webpack.config we are changing the entry prop

Entry: can be a string but it also can be an array of strings as multiple entry points, so add babel-polyfil as the FIRST item 

 entry: ['babel-polyfill', './src/app.js'],

Set it and forget it, and gives a wider range of support
*/


/*

---------- REACT HOOKS -----------

React hooks tie in to our functional components (cant use state like a calss based component and cant tie into other React features like lifecycle methods)
    - Two diff types of components - stateless functional and class based with different features but with React Hooks thats no longer the case 
    - Now they are only called FUNCTIONAL COMPONENTS not stateless b/c its possible to use state in them 
    - Intro to React Hooks = 0 breaking changes

Hook = A function
React Hook = A function that lets you tap into a React Feature (state, lifecycle methods)
    - React has own hooks to use as building blocks but can also create custom hooks (own functions)  to further customize behavoir 
    - Will first focus on the ones given to use like:

useState() = This allows us to use state in stateless functional componets
    - this function is a named export from 'react' need to import useState
    - This is a function to call to be able to use state in functional components 
    - For class based components our state has to be an object 
    - useState(initialState) takes in the initialState as the first argumnet and the state can be an object BUT also can be ANYTHING
    - returned is an array of two items:
        1) Current state value (going to change overtime)
        2) A function we can call to update state
            - use by tying useState() to a vairable and calling variable
    - With this we get state in function components and an easier way to manipulate state
    
Going to make counter again since we are learning hooks now 

1) Create stateless functional compoenet and displaying 'the current count is 0'
2) Create a variable array and set equal to calling useState() hook with a single argumnet - our initial state value which will just be a number - 0
    - Returned from useState() is an array of two items (above)
3) Change out the number 0 with a JSX reference to array referencing the 0 index b/c that is there current state is stored array[0]
    - if update number in hook the number will change 
4) Referencing array[0] is bad so the common thing to do is destructure the array when setting the variable count to the first thing in the array 
    - To destructure an array start with [] and supply variable names for the things that are in that index
5) Add button to component to change state value to +1 the count so create a button +1 and set up an onClick handler and reference the function incremnet
6) Create the function incremnet and to be able to +1 the count we need to access the second item in the array that is returned from useState() which is a func we can use to change current state
    A) Assign the variable setCount to the second thing in array 
    B) Now call setCount() passing in a number - the new number is based off of the old number so we have to reference count and manipulate the count variable - count + 1
        - This function can be an anon inline function 
7) Can set up App.defaultProps as well and can pass in a count in the props then and if no props then it wil; use the defaultProps

    Const App = ({propsCount}) =>{
    let [count, setCount] = useState(propsCount)
    return (
    <div>
        <p>The current count is {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(propsCount)}>Reset</button>
    </div>
    );}
    App.defaultProps = {
    propsCount: 15000
    }
    ReactDOM.render(<React.StrictMode><App propsCount={5}/></React.StrictMode>,
    document.getElementById('root')
    );

*/


/**
 
--------------- USESTATE VS SETSTATE ----------------

What if I want to track more than one thing? Do I NEED to pass in an object as the state to useState() then? No - just call useState() multiple times for the multiple things that are being tracked 

For this example we want to track another state in the component - what is shown in the count: The current {text} is {count}

Here we are tracking an input for {text} that will be a string

const [text, setText] = useState('')
The current {text || 'count'} is {count}

Now need an input to change the {text} and in charge of showing the current value of the text state 
    <input value = {text} onChange = {(e) => setText(text = e.target.value)}/>



IF we provided an object like the old way of managing state in class based components this wouldnt work b/c when using 

const [state, setState] = useState({
    count: 0,
    text: 'count'
})

When we try to use setState() and change the text: property it completly ERASES the count property since useState() completley replaces the old state with the new state (instead of merging all of the states like in the old classbased way) which makes it much less error prone when have multiple calls to useState for a single piece of state and allows us to break up the huge state object.
There is a work around that is not reccomended by spreading out the rest of the state on it since it completly replaces the state :
    <button onClick={() => setState({...state, count: count + 1 }}>+1</button>
But thats dumb, just call useState() multiple times


Managing an array with useState() - have an array which want user to be able to manipulate each thing on it 

1) Make new NotesApp component and rendering it
2) Make a new state with useState([]) passing in an array for the default state
3) Destructure the array that returns from useState([]) with notes and setNotes
4) Repeat (2)(3) but with a state variable as title and the function to change the state variable setTitle so set up an input to add a title onto the current note 
5) Wire up a form to hold input and note
6) Add input for title with value and onChange calling the change state function with the e.target.value
7) Set up button to submit form 
8) Wire up onSubmit function on form that manipulates teh notes array useing data stored inside title which will bethe title for the new note we want to add 
    A) NEED TO preventDeault() so no page refresh 
    B) Manipulate notes array by calling setNotes([]) passing in an array b/c notes should always be an array and 
        1) To start we want to copy over all existing notes by spreading out all of the existing notes (...notes), then adding a new object of the new note we are adding
        2) Call setTitle('') after setNotes to remove the title field after submission
9) Now want to iterate over the array adding new content to the screen with each note added by using notes.map() to take our array of objects and convert/return it as an array of JSX
    - inside notes.map((note)) return a root div with the note.title set 
    - need to specify the key property when working with arrays in JSX so set the key prop inside the wrapper div to note.title (which isnt great but its ok)
10) Add everyting for a note body including:
    A) New hook for note.body
    B) Add on body to setNotes hook
    C) Render body text in notes.map
    D) Create textarea for that with onSubmit handeler
11) Create a remove note button
    A) Create button
    B) Create onClick handler which is an anon function that calls removeNote inside of it passing in note.title inside removeNote b/c has lexical scope to that info here
    C) Create removeNote function inside using setNotes() and inside that using notes.filter to return an array of the notes that passed the filter test

Just lke array manipulation techniques from redux with the selectors and stuff 

 */



/*

--------------- USEEFFECT HOOK ---------------
useEffect allows us to do seomthing in functional components - kind of like a replacement for lifecycle methods in class based components 

lifecycle like - componentDidMount, componentDidUpdate, compoenetDidUnmount 

Currently no way to do that stuff in functional compoenent which is what useEffect does 

In counter example:

useEffect() if something that we call and pass a CBF to it which is similar to a combo of componentDidMount and componentDidUpdate 

useEffect(()=>{
    console.log('use effect ran')
})

This message will print one time when app loads, and whenever someone interacts with the app pressing buttons or changing inputs each character

When we render we run the functional component and the return is what get renders after that occurs the effect created with useEffect() gets triggered - similar to componentDidMount and componentDidUp - itll run once right away and run with changes to component state or props

Now to do something with one of the values - itll run once right away which will run with the default state values, then itll run on all updates when count/text changes 

What to do now is have the count be reflected in the documnets title that shows up in the browser tab 

1) To update the title we set document.title equal to whatever we want the title to be in this cause it is the count 
     useEffect(()=>{
          document.title = `count is ${count}`
    });

2) Here we have synced state/props with whatever we want - here the title

Notes to LS - 

1) Using useEffct to save to LS b/c when component state or porps get updated we save to LS - allowing us to get similar to lifecycle methods and everything




const NotesApp = () =>{


  const GetJSONnotes = localStorage.getItem('notes');
  const parsedNotes = JSON.parse(GetJSONnotes)
  

  const [notes, setNotes] = useState(parsedNotes || [])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addNote= (e) =>{
    e.preventDefault();
    setNotes([...notes, { title, body }])  ;
    setTitle('');
    setBody('');
  }

  const removeNote = (title) =>{
    setNotes(notes.filter((note) => note.title !== title))
  };

 
  useEffect(()=>{
    const SetJSONnotes = JSON.stringify(notes)
    localStorage.setItem('notes', SetJSONnotes)
    console.log(notes)
})

  return (
  <div>
    <h1>Notes</h1>
    {notes.map((note)=>(
      <div key={note.title}>
        <h3>{note.title}</h3>
        <p>{note.body}</p>
        <button onClick={()=> removeNote(note.title)}>Remove note</button>
      </div>
    ))}
    <p>Add note</p>
    <form onSubmit={addNote}>
      <input value = {title} onChange={(e)=>setTitle(e.target.value)}/>
      <textarea value = {body} onChange = {(e) =>{setBody(e.target.value)}}/>
      <button>Add Note</button>
    </form>
  </div>
  )
}



---------- HOW TO CONDITIONALLY FIRE AN EFFECT -------------

When useEffect() runs when it is not supposed to or not needed React is doing more work than it needs to be doing.

The useEffect() hook allows us to specify the things we care about, the things we want to make sure when they change that it runs. This is done by passing in an array as the second argument - the CBF being the first argument and the array being the second

useEffect(()=>{}, [])


- Explicitly listing out dependencaies when we want it to run

If array is left off useEffect will run anytime the props/state changes. But in the array we specify only when we WANT it to run. 

useEffect(()=>{document.title=count}, [count])

This will still run the initial time b/c that is when the initial count gets set up, BUT if any other props/state changes that is not count it will not fire. 


Can set up and use useEffect as many different functions in a functional componenet as you want. This is nice b/c in a class based component we could use ComponentDidMount() lifecycle method and everything that needed to get set up went insdie of there, even if it was seperate unrealated features they were all jammed together - with useEfffect() we can just call it when you need to and each can have its own set of dependancies 

Another way to work with usEffect() dependancies - run it once

- Provide list of dependancies but leave the array empty - this will make it run ONCE when the compoenent mounts and never again b/c it depends on nothing meaning there is nothing out there that could ever cause that behavior to change - A complete mirror of componentDidMount()

- useful when fetching or reading data 


Should usually be explict what you want it to run with so usually provide a dependancy



To change the notes app to make use of theses dependancies b/c when fetching async stuff from FBDB or something else need to break out the call to LS to get the items from LS into an async function so that code cant just live at the tope of everything to break it into a useEffect that just runs once to set the data:

const NotesApp = () =>{
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(()=>{
    const GetJSONnotes = localStorage.getItem('notes');
    const parsedNotes = JSON.parse(GetJSONnotes)
  
    if(parsedNotes){
      setNotes(parsedNotes)
    }
  },[]);

  // The order matters here! the notes start at an empty array, so as it gets to the first useEffect with the localStorage.setItem, it sets the "notes" variable to an empty array at the local storage, then it gets nothing at the second useEffect.
  
  useEffect(()=>{
    const SetJSONnotes = JSON.stringify(notes)
    localStorage.setItem('notes', SetJSONnotes)
    console.log(notes)
}, [notes]);



---- How to mimick component did unmount with useEffect()

This is used for apps where components do unmount and not made up of a single component so create a seperate component for what is getting rendered to the screen with the .map()  <Note key={note.title} removeNote = {removeNote} note={note}/>


How to clean up our effects- componentDidUnmount()

1) Call useEffect(CNF) inside of Note and C.L 'setting up effect' for now
2) This C.L will be logged every key stroke in the input b/c useEffect() is rerendering b/c not listed any dependancies
    - The parent function to Note is having state change with in the title state and Note is being rendered to reflect those changes (other effects dont suffer from this b/c dependancies are provided )
3) PRovide dependancy list, with [note] there is currently no way to edit a note so doesnt make any sense so leave it as empy array [] so effect should run once when it is mounted 
4) To regester the function to clean up a given effect (same principles as componentDidUnmount but not the same), to do this:
    A) Return a function from the useEffect() CBF so the CBF setUP the effect and the function returning below cleans it up 
    B) This return function will fire everytime a note is removed or <Note/> gets unMounted
5) Now we can run some code as any note is removed 

 */



/*
--------------- USEREDUCER HOOK ----------------

With more complex state changes we have more complex code (to manage arrray of objevts and stuff), and as app grows we add more features like this directly into the component and this isnt ideal

With redux we get a simpler way to describe complex state changes by defining reducers and get the ability to not have to pass props manually around (e.g. with the <Note/> component we are passing props to use the note) just so it can use them it would be good if less props needed and still has access to data (similar to connect() function) provided by Redux - but can rereact this behavior without Redux - Redux is NOT obsolete but these tools can come in handy if you need a simpler solution then setting up Redux 

To use:

1) import useReducer 
2) Need to define a reducer function before we use useReducer - this reducer function is going to look identical to the reducers we were already using with Redux - a function that is called with two argumnets (state, action) with state = array of notes and action=contains info about the actino being preformed 
    - It is our job to return the new state based off of whatever action has been fired off 
3) Going to create a POPULATE_NOTES action to reset the notes array and load data in from localStorage and then get things set up 

    const notesReducer = (state, action) =>{
        switch(action.type){
            case "POPULATE_NOTES":
                return action.notes
            default: 
                return state;
        }
    }
4) With reducer in place will start to use it. What we are going to end up doing is replacing the   const [notes, setNotes] = useState([]) line. By calling useReducer() with two very important arguments :
    1) Reducer function 
    2) The initial state - which can be the same as when using useState()

    useReducer(notesReducer, [])
5) Like useState, useReducer returns an array with two important things on it:
    1) Your state
    2) A dispatch function
6) Set the function call to a destructred array with the first variable being the state and the second is the dispatch function

    const [notes, dispatch] = useReducer(notesReducer, [])
    - Now have access to a dispatch to dispatch actions - since it is a variable can name it anything like notesDispatch if have multiple dispatchs

7) Now have access to state and the dispatch which will dispatch an action that will run the reducer that will manipulate the state 
8) Make changes to notesApp below all instances of setNotes change to a call to dispatch with the new action POPULATE_NOTES, REMOVE_NOTE, ADD_NOTE

const notesReducer = (state, action) =>{
  switch (action.type){
    case 'POPULATE_NOTES':
      return action.notes
    case 'REMOVE_NOTE':
      return action.notes.filter((note) => note.title !== action.title)
    case 'ADD_NOTE':
      return [...action.notes, {
        title:action.title, 
        body:action.body
        }]
    default: 
      return state
  }
}



const NotesApp = () =>{


  const [notes, dispatch] = useReducer(notesReducer, [])

  // const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const addNote= (e) =>{
    e.preventDefault();
    // setNotes([...notes, { title, body }])  ;
    dispatch({
      type: 'ADD_NOTE',
      notes,
      title,
      body


    })
    setTitle('');
    setBody('');
  }

  const removeNote = (title) =>{
    // setNotes(notes.filter((note) => note.title !== title))
    dispatch({
      type:'REMOVE_NOTE',
      notes,
      title
    })
  };

  useEffect(()=>{
    const GetJSONnotes = localStorage.getItem('notes');
    const parsedNotes = JSON.parse(GetJSONnotes)
  
    if(parsedNotes){
      // setNotes(parsedNotes)
      dispatch({
        type:'POPULATE_NOTES',
        notes: parsedNotes
      })
    }
  },[]);


So if it is an easy state like title/body we can use useState() but if it is a little more complex we can use useReducer allowing us to remove the logic from the component and storing it in a seperate function making the component easier to manage and reducer easier to use 


*/



/*

==---------------- CONTEXT API AND USECONTEXT HOOK --------

To manage a heirarchy of components. Problem trying to solve is having components that are tighly bound passing props to each other whihch makes them hard to reuse thru the app  - redux solves this too with connect() and <Provider/>- But this is now baked right into React 

So to see how contextAPI is going to help we are going to break things into different files 
1) Reducer function and all components into new folder/file
2) Breakout .map function into a NoteList component
  - A componenet that does the .map function that renders each <Note/>
  - but we are getting into a problem of passing down props from NotesApp->NoteList->Note and makes the components not reusable since the props need to come from the parent component 
3) Breakout Form component for entering new notes
  - With this we bring over addNote function which needs dispatch so pass in dispatch as the only prop

Now have more of a complex app that is passing props between compoenents, this is what we solved using redux earlier that we can solve with the context API and useContext() hook

Create the new context:
1) New file and folder /context/notes-context.js
  - Only thing in the file is creating the context which is a function, itll be up to the NoteApp component and other components to wire the things up
2) import React and then create new context:
  A) const NotesContext = React.createContext()
    - does not require any argumnets but can provide one as the default value of the context but in this case it doesnt make sense since we dont have access to the things we want to share inside the file, all of that lives in Note.app and will fix that in just a second to get a value to actually share
  B) Export the context so other files can use it
    - export NotesContext as default
    - now things are going to look similar to redux
3) import context in NotesApp and then need to set it up as something that is getting rendered in the return statement 
  A) <NotesContext.Provider> ... <NotesContext.Provider/>
    - need to use this like a wrapper div
    - With this in place we are providing the context value to any of its children and children's children children etc
    - Need to setup the context value - can put it in the context file but normally we set it as we setup the provider 
  B) We set up the value by providing a value={} prop - this is going to let us set the value of what we want everyone else to use 
    - Here we want to share the notes data AND the dispatch function 
    - Set value={} to an object with all props on it
        value = {{
            notes: notes,
            dispatch: dispatch
        }}
    - NOW everything is being shared via the context and it is up to the individual components to extract what they need from the context
4) Wire up actually using the context with the different apps
    - Starting with NoteList component that need the { notes }
5) Remove all notes and dispatch prop until we refactor removeNote and remove its prop as well 
6) Inside NoteList need access data from the context using the useContext() hook
    A) import useContext() and NotesContext 
    B) call it passing in the context we are trying to use useContext(NotesContext)
    C) What is returned from that call is the value={} that was shared in the <NotesContext.Provider/>
    D) Set return call to a destructured variable assignmnet for notes (or dispatch if need it) const {notes, dispatch} = useContext(NotesConext)
6) Refacor removeNote with context to the component that is actually using dispatch (note component)
    - import evertying, Remove removeNote and all props and put in Note and then use useContext to gain access to dispatch ( this is what we saw wtih Redux is all components get access to dispatch to be able to change same data )

7) Do the same for AddNoteForm for dispatch 

When use the useContext hook the React context API and the useReduer hook we get a mini version of Redux to share dispatch function/data in the store 



*/



/*

------------------- FRAGMENTS --------------------------

React Fragments 

This helps with the need of the wrapper <div> and not needing it. Something we want it if we want to style it as a cohesive element but sometimes it was getting in the way

Now we have a choice, if we want it we keep it and if we dont want it we use a React Fragment 

To use this use remove the 'div' element in the wrapper <div></div> BUT keeping the <> </> - this uses a React Fragment and removes the extra unnessesary element 

In a situation you dont need/want the root wrapper div element can use Fragments to remove it


Still can only return a single root JSX element with fragments itll just be empty but still needs to exist

*/




/*

----------------- CREATING CUSTOM HOOKS -----------------

The custom React hook is a function we will define which uses the built in React hooks behind the scenes  - This will make it possible to extract complex logic and to reuse the logic across components 

What makes a custom hook is the functional component using the Hooks from React through a function that we set up and not directly inside the functional component

In the Note component what functionality can we break out to be a custom hook? Lets say in our app a few components need to ability to know where the mouse cursor is - this changes as the user moves the mouse and always want the most up to date info so we can respond accordingly - 

To impletment this feature we would need to do:

1) Set up state to track the x and y mouse position (useState)
2) Setup an event listener to listen for mouse movements (no React hook needed)
3) Remove event listener on component unmount b/c if we didnt we would have a ton of event listeners pilling up behind the scenes wasting resources (useEffect)

This code will not be reusable and will need to add this code over again in another component = duplicate code, AND the Note component really doesnt need to be concerned with the implementation details of this feature all Note needs is a reliable updated x and y position passed to it (hypotheticallty if Note needed to know the curosr position)

To solve these problems we will create the custom Hook, will just add in Notes file now and break it out after functional

We will name the custom hook useMousePosition - this is a naming convention 

1) const useMousePosition = () ={}
2) inside of this we are going to set up the state of the cursor position with useState and originally setting it to an object with an x:0 y:0 - this is coupled b.c the coordinates are tied together and not two seperate pieces of info
        const [mousePosition, setPosition] = useState({x:0, y:0})
3) Now need to return the only things that the components that are using this care about - the position of the cursor since it doesnt care about the implementation details of how the mousePosition is extrapolated
        return mousePosition
4) Call it in the functional component with no arguments (can take in argumnets that you use in the hook somewhere like setting the default postiion or whatever), and calling the function gives us a return value so set the function call to a variable to store the return value
        const mousePosition = useMousePosition()
    - This is the ONLY line we are going to add inside the functional component 
5) Actually use the x/y values in the render call setting up <p> tags and labeling the x and y
6) Set up an eventListener for mousemove and inside the CBF call setPosition() updating the object with the new values of the x/y mouse position
    - This will crash the browser though 
    - So need to remove the eventListener on unMount and only register the mousemove one time even as state changes and the function needs to rerun
7) Use useEffect() to do this passing in the [] as the second argumnet for no dependancies
    - NOW the position gets updated but only get one console.log, so the mouse position only gets set up once but we still get the position in real time 
8) BUT if we remove note we get an error b/c cant update React state on an unmounted component so we need to use the cleanUpEffect on useEffect
    - So need to clean up eventlistener when component is unmounted 
9) return a function for cleanUp and inside use document.removeEventListener('mousemove', handleMouseMove) and for the second argumnet need to provide the function defined in memory so need to breakout the CBF into a variable and reference the variable

    useEffect(()=>{
            console.log('setting up useMousePosition')
            
            document.addEventListener('mousemove', onMouseMove);
            return () =>{
                document.removeEventListener('mousemove', onMouseMove)
                
                console.log('cleaning up useMousePosition')
            }
        }, [])
10) Create new dir for custom hooks src/hooks/useMousePosition.js and importing it

So by creating custom hooks:
1) Makes functional components a lot simpler 
2) Makes behavior really easy to re-use



*/


REDUX HOKS