import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './AddFriendInput.css';

class AddFriendInput extends Component {

  render () { 
    return ( 
      <section> 
        <div className={classnames("btn-group btn-toggle ", styles.genContainer)}> 
            <button className={classnames("btn btn-primary ", styles.genBtn, (this.state.gender === "male" ? "active" : "") )} name="gender" value="male" onClick={this.handleChange.bind(this)}>Male</button>
            <button className={classnames("btn btn-primary ", styles.genBtn, (this.state.gender === "female" ? "active" : "") )} name="gender" value="female"  onClick={this.handleChange.bind(this)}>Female</button>
        </div>
        <input
          type="text"
          autoFocus="true"
          className={classnames('form-control', styles.addFriendInput, (this.state.formErr ?  styles.errField : "" ) )}
          name="Fname"
          placeholder="Type the name of a friend"
          value={this.state.Fname}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)} />
      </section>
    );
  }

  constructor (props, context) {
    super(props, context);

    /**
     * Default state values
     * @variable {string} Fname - Friend Name
     * @variable {string} gender - Gender Type
     * @variable {boolean} formErr - Indicates form validation results  
     */
    this.state = {
      Fname: '',
      gender:'male',
      formErr: false
    };
  }

  handleChange (e) { 
    //dynamically update the state!
    //reset the errors on input change
    this.setState({ [e.target.name] : e.target.value, formErr:false });
  } 

  handleSubmit (e) { 
    //submit the form
    const _friendName = e.target.value.trim(); 
    const keyCode = e.which || e.keyCode;

    if (keyCode === 13) {  
      //simple empty validation
      if(_friendName === ""){
        this.setState({formErr: true});
        return;
      }
     
      //add to Friends List
      this.props.addFriend(_friendName, this.state.gender);
      
      //reset the state
      this.setState({ Fname: '', gender : 'male' });
    }
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput
