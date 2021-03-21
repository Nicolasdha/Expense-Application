import configureMockStore from 'redux-mock-store';
import { login, logout } from '../../actions/auth';
import thunk from 'redux-thunk';



const createMockStore = configureMockStore([thunk])


test('should dispatch login and set uid to store', () =>{
    const uid = 'abc123';
    const store = createMockStore({});

    store.dispatch(login(uid));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type: 'LOGIN',
        uid: uid
    });
});


test('should dispatch logout', () =>{
    const store = createMockStore({});
    store.dispatch(logout());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
        type:'LOGOUT'
    });

})