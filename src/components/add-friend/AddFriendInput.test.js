import React from 'react';    
import {shallow} from 'enzyme';
import AddFriendInput from './AddFriendInput'; 

describe('AddFriendInput Component', ()=>{

    const addFriendMock = jest.fn();
    const  wrapper = shallow(<AddFriendInput addFriend={addFriendMock} />);

    it('should call addFriend function on enter key press', ()=>{
      //must call the addFriend on enter key press
      const input = wrapper.find('input');
      input.simulate('keyDown', {keyCode: 13,target: { value: 'Jebarin'}});  
      expect(addFriendMock).toHaveBeenCalled();
    })

    it('By Default error flag must set to false', ()=>{
      //make sure the error flag is set to false by default
      expect(wrapper.state('formErr')).toBeFalsy(); 
    }) 

    it('should throw error when friend name is empty', ()=>{ 
      //make sure form validation is working
      const input = wrapper.find('input');
      input.simulate('keyDown', {keyCode: 13,target: { value: ''}});  
      expect(wrapper.state('formErr')).toBeTruthy();
    }) 

    it('should render gender input options', ()=>{
      //make sure the gender inputs are created  
      expect(wrapper.find('.btn-toggle button').length).toEqual(2); 
    })

    it('should set male as active by default', ()=>{
      //make sure the male option is selected by default 
      expect(wrapper.find('.btn-toggle').find({value:'male'}).hasClass('active')).toBeTruthy(); 
    })

    it('should set female as unactive by default', ()=>{
      //make sure the female option is un selected  by default 
      expect(wrapper.find('.btn-toggle').find({value:'female'}).hasClass('active')).toBeFalsy(); 
    })
  
})
