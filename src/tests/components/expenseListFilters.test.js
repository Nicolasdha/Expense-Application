import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseListFilters } from '../../components/expenseListFilters';
import { baseFilter, populatedFilter } from '../fixtures/filters'
import moment from 'moment';


let setStartDateSpy, setEndDateSpy, setTextFilterSpy, sortByDateSpy, sortByAmountSpy, wrapper;


beforeEach(()=>{
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            setStartDate =  {setStartDateSpy}
            setEndDate = {setEndDateSpy}
            setTextFilter = {setTextFilterSpy}
            sortByDate = {sortByDateSpy}
            sortByAmount = {sortByAmountSpy}
            filters = {baseFilter}
        />
    );
});


test('should make sure that ExpenseListFilters renders correctly with baseFilter', () =>{
    expect(wrapper).toMatchSnapshot();
});

test('should make sure that ExpenseListFilters renders correctly with populatedFilter', () =>{
    wrapper.setProps({filters: populatedFilter});
    expect(wrapper).toMatchSnapshot();
});



test('should dispatch set text action', () =>{
    const value = "rent";
    wrapper.find('input').simulate('change', {target: { value }});
    expect(setTextFilterSpy).toHaveBeenLastCalledWith(value);
});


test('should dispatch sortByDate action', () =>{
    const value = 'date';
    wrapper.setProps({
        filters: populatedFilter
    })
    wrapper.find('select').simulate('change', {target: { value }});
    expect(sortByDateSpy).toHaveBeenCalled();
});


test('should dispatch sortByAmount action', () =>{
    const value = 'amount';
    wrapper.find('select').simulate('change', {target: { value }});
    expect(sortByAmountSpy).toHaveBeenCalled();
});


test('should handle date changes', () => {
    const newDateRange = {
        startDate: moment(0).add(2, 'days'),
        endDate: moment(0).add(15, 'days')
    };
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(newDateRange);

    expect(setStartDateSpy).toHaveBeenCalledWith(newDateRange.startDate);
    expect(setEndDateSpy).toHaveBeenCalledWith(newDateRange.endDate);
});


test('should handle date focus change', () =>{
 
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')('endDate');

    expect(wrapper.state('calanderFocused')).toBe('endDate');
});

