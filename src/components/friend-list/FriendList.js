import React, { Component, PropTypes } from 'react';
import styles from './FriendList.css';
import FriendListItem from '../friend-list-item/FriendListItem';
import Pagination from '../pagination/pagination';

class FriendList extends Component {
  render () {   
    return (
      <div>
        {this.state.friendsList.length>0 && 
          <ul className={styles.friendList}>
            {
              this.state.friendsList.map((friend, index) => {
                return (
                  <FriendListItem
                    key={index}
                    id={friend.id}
                    name={friend.name}
                    gender={friend.gender}
                    date={friend.date}
                    starred={friend.starred}
                    {...this.props.actions} />
                );
              })
            }
          </ul>
        }
        <Pagination 
          items={this.props.friends}
          loadPage={this.loadFriendsList.bind(this)}
        />
      </div> 
    );
  }

  constructor(props){
    super(props);
    
    this.state = { 
      friendsList : []
    }
  }

  loadFriendsList(data){ 
    data && this.setState({friendsList: data});
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
