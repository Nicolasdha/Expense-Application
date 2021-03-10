import React from 'react';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';
import ExpenseForm from './expenseForm'



export class CreateExpensePage extends React.Component {

    onSubmit = (expense) => { 
        this.props.addExpense(expense);
        this.props.history.push('/');
    };

    render(){
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm onSubmit = {this.onSubmit}/>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
})


export default connect(undefined, mapDispatchToProps)(CreateExpensePage)


// const CreateExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit = {(expense) => { 
//                 props.onSubmit(expense);
//                 props.history.push('/');
//             }}
//         />
//     </div>
// );




// const CreateExpensePage = (props) => (
//     <div>
//         <h1>Add Expense</h1>
//         <ExpenseForm
//             onSubmit = {(expense) => { 
//                 props.dispatch(addExpense(expense))
//                 props.history.push('/')
//             }}
//         />
//     </div>
// );

// export default connect()(CreateExpensePage)