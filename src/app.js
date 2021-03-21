import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'; // css reset
import './styles/styles.scss'; // used to import CSS
import 'react-dates/lib/css/_datepicker.css';

import AppRouter from './routers/AppRouter'

import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';

import { startSetExpenses } from './actions/expenses';

import './firebase/firebase';

import { firebase } from './firebase/firebase'

const store = configureStore();

const unsubscribe = store.subscribe(() =>{ 
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    // console.log(visibleExpenses) 
})


const jsx = (
    <Provider store={store}>{AppRouter}</Provider> 
);

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        console.log('logged in')
    } else{
        console.log('logged out')
    }
})

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

store.dispatch(startSetExpenses()).then(()=>{
    ReactDOM.render(jsx, document.getElementById('app'))
})


