import moment from 'moment';
// Get visible state

export default (expenses, {  text, sortBy, startDate, endDate }) =>{
    return expenses.filter((each) =>{
        const createdAtMoment = moment(each.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = each.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) =>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(sortBy ==='amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
};



