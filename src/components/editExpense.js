import React from 'react';
import { connect } from 'react-redux';
import RemoveModal from './modal'
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import { openModal, closeModal } from '../actions/filters';
import ExpenseForm from './expenseForm'




export class EditExpensePage extends React.Component {
   
    onSubmit = (expense) =>{ 
            this.props.startEditExpense(this.props.match.id, expense)
            this.props.history.push('/')
    };

 
     

     onRemove = () =>{
        this.props.closeModal()
        this.props.startRemoveExpense( {id: this.props.match.id} )
        this.props.history.push('/')
      }

    render() {

        return (
            <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit Expense</h1>
                </div>
            </div>
                <div className="content-container">
                    <ExpenseForm
                        match = {this.props.match}
                        onSubmit = {this.onSubmit}
                        />
                    <button className="button button--secondary" onClick={()=>{this.props.openModal()}}>Remove Expense</button>
                  <RemoveModal onRemove={this.onRemove}/>
                </div>
            </div>
        );
    };
};


const mapStoreToProps = (state, props) =>({
    match: state.expenses.find((each)=> each.id === props.match.params.id),
    modalState: state.filters.modalState
});



const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id)=> dispatch(startRemoveExpense(id)),
    openModal: (modalState) => dispatch(openModal(modalState)),
    closeModal: (modalState) => dispatch(closeModal(modalState)),
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
