import React from 'react';
import { shallow } from 'enzyme';

import { CreateExpensePage } from '../../components/createExpense';
import expenses from '../fixtures/expenses'

let addExpenseSpy, history, wrapper;


beforeEach(()=>{
    addExpenseSpy = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<CreateExpensePage addExpense={addExpenseSpy} history={history} />);
});



test('should render CreateExpensePage correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});


test('should handle addExpense correctly', () =>{

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpenseSpy).toHaveBeenLastCalledWith(expenses[1])
});

