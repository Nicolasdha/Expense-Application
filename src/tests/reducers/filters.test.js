import filtersReducer from '../../reducers/filters';
import moment from 'moment';




test('should setup default filter values', () =>{
   
    const reducer = filtersReducer(undefined, {
        type: '@@INIT',
    });

    expect(reducer).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'), 
        endDate: moment().endOf('month')
    });
});





test('should dispatch SET_TEXT_FILTER ', () =>{
   const text = 'Test Text'
    const reducer = filtersReducer(undefined, { 
        type: 'SET_TEXT_FILTER',
        text
     });

    expect(reducer.text).toBe(text);
});



test('should dispatch SORT_BY_DATE ', () =>{
   const state = {
    sortBy: 'amount'
   }

    const reducer = filtersReducer(state, { type: 'SORT_BY_DATE' });

    expect(reducer.sortBy).toBe('date');
});



test('should dispatch SORT_BY_AMOUNT', () =>{
   
    const reducer = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

    expect(reducer.sortBy).toBe('amount');
});



test('should dispatch SET_START_DATE', () =>{
   
    const reducer = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate: moment().startOf('month').add(5, 'days')
    });

    expect(reducer.startDate).toEqual(moment().startOf('month').add(5, 'days')
    );
});



test('should dispatch SET_END_DATE', () =>{
   
    const reducer = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate: moment().startOf('month').subtract(5, 'days')
    });

    expect(reducer.endDate).toEqual(moment().startOf('month').subtract(5, 'days'));
});