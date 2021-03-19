import React from 'react';


import ExpenseList from './expenseList';
import ExpenseListFilters from './expenseListFilters';
import ExpensesSummary from './expensesSummary';


const ExpenseDashboardPage = () => {
   
return ( 
    <div>
        {<ExpenseListFilters/>}
        {<ExpensesSummary/>}
        {<ExpenseList/>}
    </div>
    );
};


export default ExpenseDashboardPage;
