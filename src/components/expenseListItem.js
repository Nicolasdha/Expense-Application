import React from 'react';
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom';



const ExpenseListItem =  ({ description, amount, createdAt, note, id }) => {
    let expenseAmountForTotal = amount
    return (
        <div>
            <Link to={`/edit/${id}`}><span>Description: {description}</span></Link>
            <p>Amount: {numeral(amount / 100).format('$0,0.00')}</p>
            {createdAt && <p>Created: {moment(createdAt).format("dddd, MMMM Do YYYY")}</p>}
            {note && <p> Note: {note}</p>}
        </div>
)};



export default ExpenseListItem;

