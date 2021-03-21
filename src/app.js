import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'; // css reset
import './styles/styles.scss'; // used to import CSS
import 'react-dates/lib/css/_datepicker.css';

import AppRouter, { history }  from './routers/AppRouter'

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

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

let hasRendered = false;

const renderApp = () =>{
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard');
            };
        });
    } else{
        renderApp();
        history.push('/');
    };
});





