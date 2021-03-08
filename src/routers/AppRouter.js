import React from 'react';
import { BrowserRouter, Route, Switch } from'react-router-dom';

import Header from '../components/header'
import ExpenseDashboardPage from '../components/expenseDashboard'
import CreateExpensePage from '../components/createExpense'
import EditExpensePage from '../components/editExpense'
import HelpPage from '../components/helpPage'
import NotFoundPage from '../components/404'



const AppRouter = (

    <BrowserRouter>
    <div>
        <Header />
            <Switch>
                <Route exact={true} path="/" component={ExpenseDashboardPage}/>
                <Route path="/create" component={CreateExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
    </div>
    </BrowserRouter>
);

export default AppRouter