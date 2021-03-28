import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';

export const ExpensesSummary = ({ visibleExpenses, expenseCount, allExpenseCount }) => {
    let expensesForTotal = [];
    let reducer = (accumulator, currentValue) => accumulator + currentValue;


    visibleExpenses.map((expense) =>{
        expensesForTotal.push(expense.amount / 100)
    });

    const total = expensesForTotal.length === 0 ? null : expensesForTotal.reduce(reducer);
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(total).format('$0,0.00');

    const allExpensesWord = allExpenseCount - expenseCount === 1 ? 'expense' : 'expenses'



    return (
        <div className = "page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount} </span>{expenseWord}: <span>{formattedExpensesTotal}</span></h1>
                
            { allExpenseCount - expenseCount === 0 ? undefined : 
                (<span className = "expensesNotShown">Not showing { allExpenseCount - expenseCount} {allExpensesWord}</span>)}
                
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
        allExpenseCount: state.expenses.length
    }
};


export default connect(mapStoreToProps)(ExpensesSummary);

