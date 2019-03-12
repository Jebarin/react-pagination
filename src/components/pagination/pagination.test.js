import React from 'react';    
import {shallow} from 'enzyme';
import Pagination from './pagination';  

describe('Pagination Component', ()=>{
 
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

    const mockLoadPageFn = jest.fn();

    const  wrapper = shallow( <Pagination   items={defaultFriendList} loadPage={mockLoadPageFn} />); 

    it('should render pagination', ()=>{
      //validate pagination elements 
      expect(wrapper.find('.page-item').length).toEqual(4);
    })
     
    it('should not render pagination', ()=>{
        //no pagination if items less than three
        const arr = defaultFriendList.slice(0,1);
        const  wrapper = shallow(<Pagination items={arr} loadPage={mockLoadPageFn} />); 
        expect(wrapper.find('.page-item').length).toEqual(0);
    })

    it('should loadPage function onclick of pagination', ()=>{
        //validate loadPage function calling or not
        const input = wrapper.find('.page-item').at(2);  
        input.simulate('click');  
        expect(mockLoadPageFn).toHaveBeenCalled();
    })  
     
})
