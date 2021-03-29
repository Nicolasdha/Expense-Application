
// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
export const sortByDate = () =>({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
export const sortByAmount = ()=>({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
export const setStartDate = (startDate) =>({
    type:'SET_START_DATE',
    startDate
})

// SET_END_DATE
export const setEndDate = (endDate) =>({
    type:'SET_END_DATE',
    endDate
})


export const openModal = (modalState) =>({
    type: 'OPEN_MODAL',
    modalState
});


export const closeModal = (modalState) =>({
    type: 'CLOSE_MODAL',
    modalState
});
