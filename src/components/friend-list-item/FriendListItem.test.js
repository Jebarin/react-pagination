import React from 'react';    
import {shallow} from 'enzyme';
import FriendListItem from './FriendListItem'; 

describe('FriendListItem Component', ()=>{
 
    const defaultProps = {
      id: 1552328594223,
      name: 'Abraham Lincoln',
      starred: false,
      date: '11/03/2019',
      gender: 'female'
    };

    const mockActions = {
      starFriend: jest.fn(),
      deleteFriend: jest.fn()
    }
    const  wrapper = shallow(<FriendListItem 
      id={defaultProps.id}
      name={defaultProps.name}
      gender={defaultProps.gender}
      date={defaultProps.date}
      starred={defaultProps.starred}
      {...mockActions} /> ); 

    it('should render friends list Item', ()=>{
      //must render friends list in UI   
      expect(wrapper.find('.friend-list').length).toEqual(1);
    })
    
    it('should render na,e correctly', ()=>{
      //validate name
      expect(wrapper.find('.frnd-name').text()).toEqual(defaultProps.name);
    })

    it('should render gender correctly', ()=>{
      //validate gender type 
      expect(wrapper.find('.fa-user').find('small').text()).toEqual(defaultProps.gender);
    })

    it('should call deleteFriend function on click of delete button', ()=>{
      //validate delete button click
      const input = wrapper.find('#btn-delete'); 
      input.simulate('click');  
      expect(mockActions.deleteFriend).toHaveBeenCalled();
    })

    it('should call starFriend function on click of star button', ()=>{
      //validate star button click
      const input = wrapper.find('#btn-star'); 
      input.simulate('click');  
      expect(mockActions.starFriend).toHaveBeenCalled();
    }) 
    
})
