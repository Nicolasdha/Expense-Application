
// Expenses Reducer

export default (state = [], action ) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((each) =>{
                if(each.id === action.id){
                    return {
                        ...each,
                        ...action.updates
                    }
                } else {
                    return each
                }
            })
        default:
            return state;
    };
};

