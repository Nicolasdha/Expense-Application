import React from 'react';
import moment from'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';



class ExpenseForm extends React.Component {

    constructor(props){ 
      super(props);
        this.state = {
            description: props.match ? props.match.description : '',
            note: props.match ? props.match.note : '',
            amount: props.match ? (props.match.amount / 100).toString() : '',
            createdAt: props.match ? moment(props.match.createdAt) : moment(),
            calandarFocused: false,
            error: '',
        } 
    }

    
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(() =>({ description }))
    };

    onNoteChange = (e) =>{
        const note = e.target.value
        this.setState(() =>({ note }))
    };

    onAmountChange = (e) =>{
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/g)){
            this.setState(()=>({ amount }))
        }
    };

    onDateChange = (createdAt) =>{
        if(createdAt){
            this.setState(()=> ({ createdAt }))
        }
    };

    onFocusChange = ( { focused } ) => {
        this.setState(()=>({ calandarFocused: focused}))
    };

    onSubmit = (e) =>{
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState(()=> ({error: 'Please provide Description and Amount'}));
        } else{
            this.setState(()=> ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            })
        }
    }

    render(){
        return (
            <div>
              {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text" 
                        placeholder="Description" 
                        value = {this.state.description} 
                        onChange = {this.onDescriptionChange}
                        autoFocus
                    />
                    <input 
                        type="text" 
                        placeholder="Amount"
                        value = {this.state.amount}
                        onChange = {this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calandarFocused}
                        onFocusChange = {this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange = {(day)=>false}
                    />
                    <textarea 
                        placeholder="Add a note (optional)"
                        value={this.state.note}
                        onChange = {this.onNoteChange}
                    ></textarea>
                    <button>Add Expense</button>
                </form>
            </div>
        );
    };
};

export default ExpenseForm;
