import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage }  from '../../components/editExpense';
import expenses from '../fixtures/expenses'

let editExpenseSpy, history,removeExpenseSpy, wrapper;

beforeEach(()=>{
     editExpenseSpy = jest.fn();
     history = { push: jest.fn() };
     removeExpenseSpy = jest.fn();
     wrapper = shallow(
        <EditExpensePage
            editExpense={editExpenseSpy} 
            removeExpense={removeExpenseSpy}
            history = {history}
            match={expenses[0]}
        />)
});



test('make sure edit expenses render correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});


test('should handle edit expense', () =>{

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    expect(editExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});


test('should handle remove expense', () =>{

    wrapper.find('button').simulate('click');

    expect(removeExpenseSpy).toHaveBeenLastCalledWith({id: expenses[0].id});
    expect(history.push).toHaveBeenLastCalledWith('/');
});

