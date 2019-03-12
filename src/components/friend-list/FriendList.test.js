import React from 'react';    
import {mount} from 'enzyme';
import FriendList from './FriendList'; 

describe('FriendList Component', ()=>{

    const defaultFriendList = [
        {
          id: 1552328594221,
          name: 'Theodore Roosevelt',
          starred: true,
          gender: 'male',
          date: '11/03/2019'
        },
        {
          id: 1552328594222,
          name: 'Abraham Lincoln',
          starred: false,
          gender: 'female',
          date: '11/03/2019'
        },
        {
          id: 1552328594223,
          name: 'George Washington',
          starred: false,
          gender: 'male',
          date: '11/03/2019'
        }
    ];
    const actionsMock = {
        starFriend: jest.fn(),
        deleteFriend: jest.fn()
    };
    const  wrapper = mount(<FriendList friends={defaultFriendList} actions={actionsMock} />); 

    it('should render friends list', ()=>{
      //must render friends list in UI 
      expect(wrapper.find('.friend-list').length).toBeGreaterThan(0);
    })

    it('should render single list', ()=>{
        //must render single list in UI
        const arr = defaultFriendList.slice(0,1);
        const  wrapper = mount(<FriendList friends={arr} actions={actionsMock} />);  
        expect(wrapper.find('.friend-list').length).toEqual(1);
      })

    it('should render max two list in a page', ()=>{
        //max two list per page
        expect(wrapper.find('.friend-list').length).toBeLessThanOrEqual(2);
    }) 

    it('should render pagination', ()=>{
        //must return pagination if the list contains greater than two items
        expect(wrapper.find('.pagination li').length).toEqual(4); 
    }) 
  
    it('should not render pagination', ()=>{
        //should not render pagination if the list length less than two 
        const arr = defaultFriendList.slice(0,1); 
        const  wrapper = mount(<FriendList friends={arr} actions={actionsMock} />);  
        expect(wrapper.find('.pagination li').length).toEqual(0); 
    }) 

    it('should page update on click of second page', ()=>{
      //validate is page is updating on click of second page   
      wrapper.find('.page-item').at(2).find('a').simulate('click'); 
      expect(wrapper.find('.friend-list').length).toEqual(1); 

      //validate previous page click
      wrapper.find('.page-item').at(0).find('a').simulate('click');  
      expect(wrapper.find('.friend-list').length).toEqual(2); 

      //validate next page click
      wrapper.find('.page-item').at(3).find('a').simulate('click');  
      expect(wrapper.find('.friend-list').length).toEqual(1); 
    }) 

})
