import React from 'react';
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom';



const ExpenseListItem =  ({ description, amount, createdAt, note, id }) => {
    let expenseAmountForTotal = amount
    return (
            <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{createdAt && <p>{moment(createdAt).format("dddd, MMMM Do YYYY")}</p>}</span>
            </div>
                <h3 className="list-item__data">
                    {numeral(amount / 100).format('$0,0.00')}
                </h3>
            </Link>
)};

// {note && <p> Note: {note}</p>}


export default ExpenseListItem;

