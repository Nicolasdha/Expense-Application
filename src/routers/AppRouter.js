import React from 'react';
import { Router, Route, Switch } from'react-router-dom';

import { createBrowserHistory } from 'history';
import Header from '../components/header'
import ExpenseDashboardPage from '../components/expenseDashboard'
import CreateExpensePage from '../components/createExpense'
import EditExpensePage from '../components/editExpense'
import HelpPage from '../components/helpPage'
import NotFoundPage from '../components/404'
import LoginPage from '../components/LoginPage'

export const history = createBrowserHistory();

const AppRouter = (

    <Router history={history}>
    <div>
        <Header />
            <Switch>
                <Route exact={true} path="/" component={LoginPage}/>
                <Route path="/dashboard" component={ExpenseDashboardPage}/>
                <Route path="/create" component={CreateExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
    </div>
    </Router>
);

export default AppRouter