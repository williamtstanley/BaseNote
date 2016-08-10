var React = require('react');
var UserMenu = require("./user_menu")


var SideHeaderBar = React.createClass({
  render: function(){
    return (
      <div className="header-bar header-bar-left">
        <div>
          <span className="header-title">Pending Action</span>
          <UserMenu 
            loginUser={this.props.loginUser}
            logoutUser={this.props.logoutUser}
            currentUser={this.props.currentUser}
            users={this.props.users} />
        </div>
      </div>
    )
  }
})


module.exports = SideHeaderBar;

