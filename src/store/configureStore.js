import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';




// Store creation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {

    
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            authentication: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
};


