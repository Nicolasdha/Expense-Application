import React from 'react';
import { Link } from 'react-router-dom';



const ExpenseListItem =  ({ description, amount, createdAt, note, id }) => (
    <div>
    <Link to={`/edit/${id}`}><span>Description: {description}</span></Link>
       <p>Amount: {amount}</p>
       {createdAt && <p>Created At: {createdAt}</p>}
       {note && <p> Note: {note}</p>}
    </div>
);



export default ExpenseListItem;

