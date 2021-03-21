import React from 'react';
import {LoginPage} from '../../components/LoginPage'
import { shallow } from 'enzyme';
 
let wrapper, startLoginSpy;

beforeEach(()=>{
    startLoginSpy = jest.fn();
    wrapper = shallow(<LoginPage startLogin = {startLoginSpy}/>);
});

test('should render login page correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () =>{
    wrapper.find('button').simulate('click');
    expect(startLoginSpy).toHaveBeenCalled();
});
