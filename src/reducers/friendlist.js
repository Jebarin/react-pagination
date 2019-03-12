import * as types from '../constants/ActionTypes';

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

export default function friends(state = initialState, action) { 
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            id: new Date().getTime(), 
            name: action.name,
            gender: action.gender,
            date: new Date().toLocaleDateString()
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item) => item.id !== action.id)
      };
    case types.STAR_FRIEND: 
      let friends = [...state.friendsById];
      let friend = friends.find((item) => item.id === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      }; 

    default:
      return state;
  }
}
