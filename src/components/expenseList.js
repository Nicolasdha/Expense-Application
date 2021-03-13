import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './expenseListItem';
import getVisibleExpenses from '../selectors/expenses';



export const ExpenseList = (props) => {
    
    return (
        <div>
            {
                props.expenses.length === 0 ? (
                    <p>Please add expense!</p>) : (
                        props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense}/>) 
                    )
            }
        </div>
)};

const mapStoreToProps = (state) =>{
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStoreToProps)(ExpenseList);
