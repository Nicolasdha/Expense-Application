import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage }  from '../../components/editExpense';
import expenses from '../fixtures/expenses'

let startEditExpenseSpy, history,startRemoveExpenseSpy, wrapper;

beforeEach(()=>{
     startEditExpenseSpy = jest.fn();
     history = { push: jest.fn() };
     startRemoveExpenseSpy = jest.fn();
     wrapper = shallow(
        <EditExpensePage
            startEditExpense={startEditExpenseSpy} 
            startRemoveExpense={startRemoveExpenseSpy}
            history = {history}
            match={expenses[0]}
        />)
});



test('make sure edit expenses render correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});


test('should handle edit expense', () =>{

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);

    expect(startEditExpenseSpy).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
});


test('should handle remove expense', () =>{

    wrapper.find('button').simulate('click');

    expect(startRemoveExpenseSpy).toHaveBeenLastCalledWith({id: expenses[0].id});
    expect(history.push).toHaveBeenLastCalledWith('/');
});

