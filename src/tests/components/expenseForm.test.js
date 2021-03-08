import React from 'react';
import {shallow} from 'enzyme';

import expenses from '../fixtures/expenses'
import ExpenseForm from '../../components/expenseForm';




test('should render expense form', () =>{
    const wrapper = shallow(<ExpenseForm />)

    expect(wrapper).toMatchSnapshot();
});




test('should render expense form when information is passed in from edit expense', () => {
    const wrapper = shallow(<ExpenseForm match={expenses[0]}/>)

    expect(wrapper).toMatchSnapshot();
});




test('should set this.state.error and render error message when description/amount is missing', () =>{
    const wrapper = shallow(<ExpenseForm />)

    expect(wrapper).toMatchSnapshot();

    wrapper.find('form').simulate('submit', {
        preventDefault: ()=>{}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);

    expect(wrapper).toMatchSnapshot();

});