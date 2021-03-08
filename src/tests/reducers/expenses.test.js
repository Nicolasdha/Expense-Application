import expensesReducer from '../../reducers/expenses';
import Expenses from '../fixtures/expenses'
import moment from 'moment';


test('should set state to default', () =>{
    const reducer = expensesReducer(undefined, {
        type: '@@INIT'
    });

    expect(reducer).toEqual([]);
});



test('should dispatch ADD_EXPENSE', () =>{
    const expense = {
        description: 'Test',
        note: '',
        amount: 100,
        createdAt: 100,
        id: 2
    }
    const reducer = expensesReducer(Expenses, {
        type: 'ADD_EXPENSE',
        expense 
     });

     expect(reducer).toEqual([...Expenses, expense]);
});


test('should dispatch REMOVE_EXPENSE', () =>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: Expenses[0].id
    };

    const reducer = expensesReducer(Expenses, action);

    expect(reducer).toEqual([Expenses[1], Expenses[2]]);
});


test('should not remove an expense if id not found', () =>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: "500"
    };

    const reducer = expensesReducer(Expenses, action);

    expect(reducer).toEqual(Expenses);
});




test('should dispatch EDIT_EXPENSE', () =>{
    const reducer = expensesReducer(Expenses, {
        type: 'EDIT_EXPENSE',
        id: Expenses[0].id,
        updates: {
            id: '1',
            description: 'Edited Test1',
            note: '',
            amount: 500,
            createdAt: 500,
        }
     });

     expect(reducer).toEqual([{
        id: '1',
        description: 'Edited Test1',
        note: '',
        amount: 500,
        createdAt: 500
    }, 
    Expenses[1], 
    Expenses[2]]);
});





test('should not dispatch EDIT_EXPENSE if id not found', () =>{
    const reducer = expensesReducer(Expenses, {
        type: 'EDIT_EXPENSE',
        id: '500',
        updates: {
            id: '1',
            description: 'Edited Test1',
            note: '',
            amount: 500,
            createdAt: 500,
        }
     });

     expect(reducer).toEqual(Expenses);
});