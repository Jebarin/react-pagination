import * as actions from '../actions/FriendsActions';
import friends from '../reducers/friendlist';

describe('FriendList Reducer', ()=>{ 

    const initialState = {
        friendsById: [
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
        ]
    };

    it('should return the default state', () => {
        //given state and default state must match
        expect(friends(undefined, {})).toEqual(initialState);
    })

    it('should handle add friend functionality', ()=>{ 
        //adding new friend to the existing list
        const name = 'Jebarin';
        const gender =  'male';
        const friendsList = friends(undefined, actions.addFriend(name,gender)); 
        expect(friendsList.friendsById.length).toEqual(initialState.friendsById.length+1);
    })

    it('should delete friend from the list', ()=>{ 
        //delete a friend from the list using id
        const id = 1552328594222; 
        const friendsList = friends(undefined, actions.deleteFriend(id)); 
        expect(friendsList.friendsById.length).toEqual(initialState.friendsById.length-1);
    })

    it('should star a friend', ()=>{ 
        //star a given friend
        const id = 1552328594222; 
        const friendsList = friends(undefined, actions.starFriend(id));  
        const item = friendsList.friendsById.filter(item => item.id === id); 
        expect(item[0].starred).toBeTruthy();
    })

    it('should un star a friend', ()=>{ 
        //un star a given friend
        const id = 1552328594221; 
        const friendsList = friends(undefined, actions.starFriend(id));  
        const item = friendsList.friendsById.filter(item => item.id === id); 
        expect(item[0].starred).toBeFalsy();
    }) 
    
})
