import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'; // css reset
import './styles/styles.scss'; // used to import CSS

import AppRouter from './routers/AppRouter'

import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';

import { addExpense, removeExpense, editExpense } from './actions/expenses';

import 'react-dates/lib/css/_datepicker.css';



const store = configureStore();

const unsubscribe = store.subscribe(() =>{ 
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses) 
})



const expenseOne = store.dispatch(addExpense({
    description: 'Water Bill',
    amount: 5000, 
    createdAt: 1614892714616,
    note: "Last water bill in dis piece"
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'Gas Bill',
    amount: 25000, 
    createdAt: 714616,
}));


const jsx = (
    <Provider store={store}>{AppRouter}</Provider> 
);



ReactDOM.render(jsx, document.getElementById('app'))

