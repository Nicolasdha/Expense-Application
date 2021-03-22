import { startAddExpense, addExpense, editExpense, removeExpense, startSetExpenses, setExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses'
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase'

const uid = "thisismytestuid";
const createMockStore = configureMockStore([thunk]);
const defaultAuthState = {authentication: { uid }};

beforeEach((done)=>{
    const dummyExpenses = {};
    expenses.forEach(({ id, description, amount, createdAt, note }) =>{
        dummyExpenses[id] = {
            description: description,
            amount,
            createdAt,
            note
        }
    });
    database.ref(`users/${uid}/expenses`).set(dummyExpenses).then(()=> done());
});



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
    
    const action = addExpense(expenses[0])

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});


test('should add expense to DB and store', (done) =>{
    const store = createMockStore(defaultAuthState);
    
    const expenseData =  {
        description: 'Mouse',
        amount: 3000 ,
        note: 'This mouse is better',
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

        }).then((snapshot) =>{
            expect(snapshot.val()).toEqual(expenseData);
            done();
    });
});



test('should setup add expense action object with default values', (done) =>{
    const store = createMockStore(defaultAuthState);
    
    const expenseDefault = {
        description:'',
        note:'',
        amount:0,
        createdAt:0
    };

    store.dispatch(startAddExpense({})).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

        }).then((snapshot) =>{
            expect(snapshot.val()).toEqual(expenseDefault);
            done();
    }); 
});




test('should setup SET_EXPENSE action object with data', () =>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})


test('should fetch the expenses from FB', (done)=>{
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});


test('should remove expense from firebase and redux', (done) =>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id
    store.dispatch(startRemoveExpense({ id })).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot)=>{
            expect(snapshot.val()).toBeFalsy();
            done();
        });
    });
});


test('should edit expense from firebase and redux', (done) =>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[1].id;
    const updates = {
        description: 'pooping',
        amount: 33242,
        createdAt: 123123131,
        note: "expensive poop",
        id
    };

    store.dispatch(startEditExpense(id, updates))
    .then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
       return database.ref(`users/${uid}/expenses/${id}`).once('value')})
       .then((snapshot)=>{
           expect(snapshot.val()).toEqual({
               ...updates
           });
       done();
    });
})






// test('should set up default addExpense action object', () =>{
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0,
//         }
//     })
// })

