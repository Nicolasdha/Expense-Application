import React from 'react';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './expenseForm'



export class EditExpensePage extends React.Component {

    onSubmit = (expense) =>{ 
            this.props.startEditExpense(this.props.match.id, expense)
            this.props.history.push('/')
    };

    onRemove = () => {
        // const removeConfirmation = window.prompt('Are you sure you want to remove? Type Y to confirm')
        // if(removeConfirmation === 'yes'.toLowerCase() || 'y'.toLowerCase()){
            this.props.startRemoveExpense( {id: this.props.match.id} )
            this.props.history.push('/')
        // };
     };

    render() {

        return (
            <div>
                <ExpenseForm
                    match = {this.props.match}
                    onSubmit = {this.onSubmit}
                    />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    };
};


const mapStoreToProps = (state, props) =>({
    match: state.expenses.find((each)=> each.id === props.match.params.id),
});



const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id)=> dispatch(startRemoveExpense(id))
});



export default connect(mapStoreToProps, mapDispatchToProps)(EditExpensePage);




// const EditExpensePage = (props) => {
//     const match = props.expenses.find((each)=> each.id === props.match.params.id)
//     return (
//     <div>
//         <ExpenseForm
//             match = {match}
//             onSubmit = {(expense) =>{ 
//                 props.dispatch(startEditExpense(match.id, expense))
//                 props.history.push('/')
//             }}
//             />
//         <button
//             onClick={() => {
//                 const removeConfirmation = window.prompt('Are you sure you want to remove? Type Y to confirm')
//                 if(removeConfirmation === 'yes'.toLowerCase() || 'y'.toLowerCase()){
//                     props.dispatch(startRemoveExpense( {id: match.id} ))
//                     props.history.push('/')
//                 }
//              }}
//         >Remove</button>
//     </div>
//     );
// };