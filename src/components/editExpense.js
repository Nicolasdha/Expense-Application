import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './expenseForm'




const EditExpensePage = (props) => {
    const match = props.expenses.find((each)=> each.id === props.match.params.id)
    return (
    <div>
        <ExpenseForm
            match = {match}
            onSubmit = {(expense) =>{ 
                props.dispatch(editExpense(match.id, expense))
                props.history.push('/')
            }}
            />
        <button
            onClick={() => {
                const removeConfirmation = window.prompt('Are you sure you want to remove? Type Y to confirm')
                if(removeConfirmation === 'yes'.toLowerCase() || 'y'.toLowerCase()){
                    props.dispatch(removeExpense( {id: match.id} ))
                    props.history.push('/')
                }
             }}
        >Remove</button>
    </div>
    );
};

const mapStoreToProps = (state) =>({
    expenses: state.expenses,
});


export default connect(mapStoreToProps)(EditExpensePage)