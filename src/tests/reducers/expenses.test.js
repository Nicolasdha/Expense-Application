import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses'
import moment from 'moment';


test('should set state to default', () =>{
    const state = expensesReducer(undefined, {
        type: '@@INIT'
    });

    expect(state).toEqual([]);
});



test('should dispatch ADD_EXPENSE', () =>{
    const expense = {
        description: 'Test',
        note: '',
        amount: 100,
        createdAt: 100,
        id: 2
    }
    const state = expensesReducer(expenses, {
        type: 'ADD_EXPENSE',
        expense 
     });

     expect(state).toEqual([...expenses, expense]);
});


test('should dispatch REMOVE_EXPENSE', () =>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[1], expenses[2]]);
});


test('should not remove an expense if id not found', () =>{
    const action = {
        type: 'REMOVE_EXPENSE',
        id: "500"
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});




test('should dispatch EDIT_EXPENSE', () =>{
    const state = expensesReducer(expenses, {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            id: '1',
            description: 'Edited Test1',
            note: '',
            amount: 500,
            createdAt: 500,
        }
     });

     expect(state).toEqual([{
        id: '1',
        description: 'Edited Test1',
        note: '',
        amount: 500,
        createdAt: 500
    }, 
    expenses[1], 
    expenses[2]]);
});





test('should not dispatch EDIT_EXPENSE if id not found', () =>{
    const state = expensesReducer(expenses, {
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

     expect(state).toEqual(expenses);
});

test("should set expenses on state and any that exist on state should be gone", () =>{
    const action = {
        type: "SET_EXPENSES",
        expenses: [expenses[1]]
    }
    
     const state = expensesReducer(expenses, action);

     expect(state).toEqual([expenses[1]]);
});