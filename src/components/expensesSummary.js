import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom'
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
    <div className = "page-header">
        <div className="content-container">
            <h1 className="page-header__title">Viewing <span>{props.expenseCount} </span>{expenseWord} totaling <span>{formattedExpensesTotal}</span></h1>
            <hr></hr>
            <div className = "page-header__actions">
                <Link className="button" to='/create'>Add Expense</Link>
            </div>
        </div>
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

