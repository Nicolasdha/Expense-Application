import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../components/404';


test('should render 404 not found page', () =>{
    const wrapper = shallow(<NotFound />);

    expect(wrapper).toMatchSnapshot();
});