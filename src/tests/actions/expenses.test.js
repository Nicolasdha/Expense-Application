import { addExpense, editExpense, removeExpense } from '../../actions/expenses';



test('should setup remove expense action object', () =>{ 
    const action = removeExpense({ id: '123abc'})
    expect(action).toEqual({
        type:'REMOVE_EXPENSE', 
        id: '123abc'
    });
});


test('should setup edit expense action object', () =>{
    const action = editExpense('abc123', {
        amount: 'updated amount',
        note: 'updated note',
    });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            amount: 'updated amount',
            note: 'updated note',
        }
    });
});

test('should setup add expense action object with provided values', () =>{
    const expenseData = {
        description: 'test',
        amount: 0,
        note:"test",
        createdAt: 0
    }
    
    const action = addExpense(expenseData)

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
           ...expenseData,
           id: expect.any(String)
        }
    });
});




test('should set up default addExpense action object', () =>{
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
        }
    })
})

