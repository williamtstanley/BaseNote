var React = require('react');
var Select = require('react-select');


var UserMenu = React.createClass({
  getInitialState: function(){
    return {
      open: false,
      currentUser: this.props.currentUser,
      users: [],
      options: [],
      value: {value: "default", label: "Please select a user"}
    }
  },
  openClick: function(e){
    this.setState({open: true})
    var options = this.props.users.map(function(user){
      return {value: user._id, label: user.firstName + " " + user.lastName}
    });
    this.setState({options: options, users: this.props.users})
  },
  closeClick: function(){
    this.setState({open: false})
  },
  logChange: function(val){
    var user = this.state.users.filter(function(user){
      return val.value === user._id
    });
    this.setState({value: val, currentUser: user[0]}, function(){
      this.props.loginUser(this.state.currentUser)
    })
  },
  logoutBtnClick: function(){
    this.props.logoutUser()
  },
  render: function(){
    var menuStyle = {
      display: this.state.open ? 'block' : 'none'
    };
   return (
    <div className="user-control-container">
      <span>{this.props.currentUser.firstName + " " + this.props.currentUser.lastName}</span>
      <span style={{float: "right"}} onClick={this.openClick}><i className="fa fa-bars" aria-hidden="true"></i></span>
      <div>
        <div style={menuStyle}>
          <Select
              name="form-field-name"
              value={this.state.value}
              options={this.state.options}
              onChange={this.logChange}
          />
          <button onClick={this.logoutBtnClick}>Logout</button>
          <span style={{float: "right"}} onClick={this.closeClick}><i className="fa fa-times" aria-hidden="true"></i></span>
        </div>
      </div>
    </div>
    );
  }
});

module.exports = UserMenu;

