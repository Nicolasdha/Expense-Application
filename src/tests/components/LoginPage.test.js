import React from 'react';
import {LoginPage} from '../../components/LoginPage'
import { shallow } from 'enzyme';
 
test('should render login page correctly', () =>{
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
})