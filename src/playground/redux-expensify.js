import { combineReducers, createStore } from 'redux';
import { v4 as uuid } from 'uuid';

// ADD_EXPENSE
const addExpense = (
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


// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) =>({
    type: 'REMOVE_EXPENSE',
    id,
});


// EDIT_EXPENSE
const editExpense = (id, updates) =>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () =>({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = ()=>({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate) =>({
    type:'SET_START_DATE',
    startDate
})

// SET_END_DATE
const setEndDate = (endDate) =>({
    type:'SET_END_DATE',
    endDate
})




// Expenses Reducer

const expensesReducer = (state = [], action ) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
            //state.concat(action.expense)
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((each) =>{
                if(each.id === action.id){
                    return {
                        ...each,
                        ...action.updates
                    }
                } else {
                    return each
                }
            })
        default:
            return state;
    };
};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
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
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    };
};





// Store creation

const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,

}));


// Get visible state

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





const unsubscribe = store.subscribe(() =>{ 
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses) 
})



const expenseOne = store.dispatch(addExpense({
    description: 'Coffee',
    amount: 300, 
    createdAt: 1000,
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'rent',
    amount: 54500, 
    createdAt: -1000,
}));


store.dispatch(sortByAmount());



const expenseThree = store.dispatch(addExpense({
    description: 'Food',
    amount: 1500, 
    createdAt: 15000
}));

const expenseFour = store.dispatch(addExpense({
    description: 'BJ',
    amount: 5500, 
    createdAt: 91000
}));

// store.dispatch(setTextFilter('REnt'));

// store.dispatch(sortByAmount());

// store.dispatch(setStartDate(0));
// store.dispatch(setEndDate(990));



// store.dispatch(setTextFilter());

// const expenseThree = store.dispatch(addExpense({
//     description: 'BJ',
//     amount: 1000, 
// }));

// const expenseFour = store.dispatch(addExpense({
//     description: 'Pussy',
//     amount: 5000, 
// }));

// store.dispatch(setEndDate());
// store.dispatch(setStartDate());
// const removeExpenseOne = store.dispatch(removeExpense({id: expenseOne.expense.id}));

// store.dispatch(sortByDate());

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: -500 }));

















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


