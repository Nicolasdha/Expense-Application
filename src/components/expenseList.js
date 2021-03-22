import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './expenseListItem';
import getVisibleExpenses from '../selectors/expenses';



export const ExpenseList = (props) => {
    return (
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Expenses</div>
                <div className="show-for-desktop">Expenses</div>
                <div className="show-for-desktop">Amount</div>
            </div>
            <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className = "list-item list-item--message">
                        <span>Please add expense!</span>
                    </div>
                    ) : (
                    props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense} />)
                )
            }
        </div>
        </div>
    )
};

const mapStoreToProps = (state) =>{
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStoreToProps)(ExpenseList);



