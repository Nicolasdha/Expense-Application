import React from 'react';
import { shallow } from 'enzyme';

import { ExpensesSummary } from '../../components/expensesSummary';
import expenses from '../fixtures/expenses'



test('should render the correct total', () =>{
    const wrapper = shallow(<ExpensesSummary expenseCount={expenses.length} visibleExpenses={expenses}/>)
    expect(wrapper).toMatchSnapshot();
})