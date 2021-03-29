import React from 'react';
import { Router, Route, Switch } from'react-router-dom';

import { createBrowserHistory } from 'history';
import ExpenseDashboardPage from '../components/expenseDashboard';
import CreateExpensePage from '../components/createExpense';
import EditExpensePage from '../components/editExpense';
import HelpPage from '../components/helpPage';
import NotFoundPage from '../components/404';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import  RemoveModal  from '../components/modal';

export const history = createBrowserHistory();

const AppRouter = (

    <Router history={history}>
    <div>
            <Switch>
                <PublicRoute exact={true} path="/" component={LoginPage}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
                <PrivateRoute path="/create" component={CreateExpensePage}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
                <PrivateRoute path="/remove/:id" component={RemoveModal}/>
                <PublicRoute path="/help" component={HelpPage}/>
                <PublicRoute component={NotFoundPage}/>
            </Switch>
    </div>
    </Router>
);

export default AppRouter