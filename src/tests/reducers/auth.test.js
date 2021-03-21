import authReducer from '../../reducers/auth';




test('should dispatch LOGIN and set uid', () =>{
    const uid = 'abc123';
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer(state, action);
    expect(state.uid).toBe(action.uid)
})


test('should dispatch LOGOUT', () =>{
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: 'abc123'}, action);
    expect(state).toEqual({})
})