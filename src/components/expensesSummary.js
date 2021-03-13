import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';

export const ExpensesSummary = (props) => {
    let expensesForTotal = [];
    let reducer = (accumulator, currentValue) => accumulator + currentValue;


    props.visibleExpenses.map((expense) =>{
        expensesForTotal.push(expense.amount / 100)
    });

    const total = expensesForTotal.length === 0 ? null : expensesForTotal.reduce(reducer);
    const expenseWord = props.expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(total).format('$0,0.00');



    return (
    <div>
        <p>Total: {formattedExpensesTotal}</p>
        <p>From {props.expenseCount} {expenseWord}</p>
        <hr></hr>
    </div>
    )
};


const mapStoreToProps = (state) =>{
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    return {
        visibleExpenses: visibleExpenses,
        expenseCount: visibleExpenses.length,
    }
};


export default connect(mapStoreToProps)(ExpensesSummary);

