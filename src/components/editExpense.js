import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal'
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './expenseForm'




export class EditExpensePage extends React.Component {
    state = {
        modalState: undefined
      };

    onSubmit = (expense) =>{ 
            this.props.startEditExpense(this.props.match.id, expense)
            this.props.history.push('/')
    };

    openModal = () => {
        this.setState(()=>({ modalState: true }
            ));
     };
     
     closeModal = () => {
         this.setState(()=>({ modalState: undefined }))
     }

     onRemove = () =>{
        this.setState(()=>({ modalState: undefined }
        ));
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
                    <button className="button button--secondary" onClick={this.openModal}>Remove Expense</button>
                    <Modal
                        isOpen={!!this.state.modalState} 
                        contentLabel="Are you sure you want to remove this expense?"
                        appElement={document.getElementById('app')}
                        onRequestClose={this.closeModal}
                        closeTimeoutMS={200} 
                        className="modal"
                    >
                       <div className="modal__titleContainer">
                            <h3 className="modal__title">Remove expense?</h3>
                       </div>
                        <div className="modal__buttonContainer">
                            <button className="button modal--button" onClick={this.onRemove}>Yes</button>
                            <button className="button modal--button" onClick={this.closeModal}>No</button>
                        </div>

                    </Modal>
                </div>
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
