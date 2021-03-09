import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';

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


test('should set description on input change', () =>{
    const value = "New Description"
   const wrapper = shallow(<ExpenseForm />);
   expect(wrapper).toMatchSnapshot();

    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('description')).toBe(value)
    expect(wrapper).toMatchSnapshot();

});


test('should set note on textarea change', () =>{
    const value = "New Note";
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('textarea').simulate('change', {
        target: { value }
    });

    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();
});



test('should set amount on VALID input change', () =>{
    const value = '100.22';
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('input').at(1).simulate('change', {target: { value }})

    expect(wrapper.state('amount')).toBe(value)

    expect(wrapper).toMatchSnapshot();

})



test('should NOT set amount on INVALID input change', () =>{
    const value = '100.100';
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('input').at(1).simulate('change', {target: { value }})

    expect(wrapper.state('amount')).toBe('')
    expect(wrapper).toMatchSnapshot();
});



test('should call onSubmit prop for valid form submission', () =>{
    const onSubmitSpy = jest.fn();

    const wrapper = shallow(<ExpenseForm match={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: ()=>{},
    })

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        amount: expenses[0].amount,
        description: expenses[0].description,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note
    });
});


test('should set new date on date change', () =>{
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now)

});


test('should change calanderFocused property ', () =>{
    const wrapper = shallow(<ExpenseForm />);

    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused:true });

    expect(wrapper.state('calandarFocused')).toEqual(true)

});

