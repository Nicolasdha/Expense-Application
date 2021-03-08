import moment from 'moment';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../../actions/filters';



test('should setup set text filter action object with provided value', () =>{
    const action = setTextFilter('Test Text');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Test Text'
    });
});


test('should setup set default text filter action object', () =>{
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});


test('should setup sort by date action object', () =>{
    expect(sortByDate()).toEqual({type: 'SORT_BY_DATE'});
});


test('should setup sort by amount action object', () =>{
    expect(sortByAmount()).toEqual({type: 'SORT_BY_AMOUNT'});
});


test('should setup set start date action object', () =>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});


test('should setup set end date action object', () =>{
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});