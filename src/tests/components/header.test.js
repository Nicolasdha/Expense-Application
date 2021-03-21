import React from 'react';
import { Header } from '../../components/header'
import { shallow } from 'enzyme';
 
let startLogoutSpy, wrapper;

beforeEach(()=>{
    startLogoutSpy = jest.fn();
    wrapper = shallow(<Header startLogout = {startLogoutSpy}/>);
});

test('should render Header correctly', () =>{
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () =>{
    wrapper.find('button').simulate('click');
    expect(startLogoutSpy).toHaveBeenCalled();
});