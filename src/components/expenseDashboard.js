import React from 'react';


import ExpenseList from './expenseList';
import ExpenseListFilters from './expenseListFilters';
import ExpensesSummary from './expensesSummary';


const ExpenseDashboardPage = () => {
   
return ( 
    <div>
        {<ExpensesSummary/>}
        {<ExpenseListFilters/>}
        {<ExpenseList/>}
    </div>
    );
};


export default ExpenseDashboardPage;
