import moment from 'moment';

const baseFilter = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
}


const populatedFilter = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days'),
}

export {baseFilter, populatedFilter};