import React from 'react';
import { shallow } from 'enzyme';

import ExpenseDashboardPage from '../../components/expenseDashboard';


test('should set up expense dashboard page', () =>{
    const wrapper = shallow(<ExpenseDashboardPage />);

    expect(wrapper).toMatchSnapshot();
});
