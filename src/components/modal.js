import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { closeModal } from '../actions/filters';
import {  startRemoveExpense } from '../actions/expenses';
import { history } from '../routers/AppRouter';


export class RemoveModal extends React.Component {

    onRemove = () =>{
        this.props.closeModal();
        this.props.startRemoveExpense( {id: this.props.match.id} );
        history.push('/');
      };

    render() {
        return (
            <div>
                <Modal
                    isOpen={!!this.props.modalState}
                    contentLabel="Are you sure you want to remove this expense?"
                    appElement={document.getElementById('app')}
                    onRequestClose={()=>{this.props.closeModal()}}
                    closeTimeoutMS={200}
                    className="modal"
                >
                <div className="modal__container">
                    <div className="modal__titleContainer">
                        <h3 className="modal__title">Remove expense?</h3>
                        <div className="modal__buttonContainer">
                            <button className="button modal--button" onClick={this.onRemove}>
                                Yes
                            </button>
                            <button className="button modal--button" onClick={()=>{this.props.closeModal()}}>
                                No
                            </button>
                        </div>
                    </div>
                <div className="modal__pictureContainer">
                    <img className="modal--img" src="/images/trashcan2.jpeg" />
                </div>
                </div>
                </Modal>
            </div>
        );
    };
};


const mapStoreToProps = (state, props) =>({
    modalState: state.filters.modalState
});



const mapDispatchToProps = (dispatch) => ({
    startRemoveExpense: (id)=> dispatch(startRemoveExpense(id)),
    closeModal: (modalState) => dispatch(closeModal(modalState)),
});



export default connect(mapStoreToProps, mapDispatchToProps)(RemoveModal);
