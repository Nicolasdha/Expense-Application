import React from 'react';
import { shallow } from 'enzyme';

import { CreateExpensePage } from '../../components/createExpense';
import expenses from '../fixtures/expenses'

let startAddExpenseSpy, history, wrapper;


beforeEach(()=>{
    startAddExpenseSpy = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<CreateExpensePage startAddExpense={startAddExpenseSpy} history={history} />);
});



test('should render CreateExpensePage correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});


test('should handle addExpense correctly', () =>{

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpenseSpy).toHaveBeenLastCalledWith(expenses[1])
});

