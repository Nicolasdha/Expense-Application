import React from 'react';
import Header from '../../components/header'
import { shallow } from 'enzyme';
 


test('should render Header correctly', () =>{
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
});



// test('should render Header correctly', () =>{
//     const renderer = new ReactShallowRenderer();
//     renderer.render(<Header/>);
//     expect(renderer.getRenderOutput()).toMatchSnapshot();
// });