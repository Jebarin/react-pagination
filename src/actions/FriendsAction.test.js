import * as actions from './FriendsActions';
import * as types from '../constants/ActionTypes'; 

describe('FriendsAction Actions', ()=>{

    it('should create an action to add friend', ()=>{ 
        //must create an action to add friend
        const name = 'Jebarin';
        const gender = 'male';
        const expectedAction = {
          type: types.ADD_FRIEND,
          name,
          gender
        }
        expect(actions.addFriend(name, gender)).toEqual(expectedAction);
    })

    it('should create an action to delete friend', ()=>{ 
        //must create an action to delte friend
        const id = 1552328594221; 
        const expectedAction = {
          type: types.DELETE_FRIEND, 
          id
        }
        expect(actions.deleteFriend(id)).toEqual(expectedAction);
    })

    it('should create an action to star friend', ()=>{ 
        //must create an action to start friend
        const id = 1552328594221; 
        const expectedAction = {
          type: types.STAR_FRIEND, 
          id
        }
        expect(actions.starFriend(id)).toEqual(expectedAction);
    })
 

})
