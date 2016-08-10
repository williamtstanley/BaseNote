var React = require('react');
var UserMenu = require("./user_menu");

var SideHeaderBar = React.createClass({
  render: function () {
    return React.createElement(
      "div",
      { className: "header-bar header-bar-left" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "span",
          { className: "header-title" },
          "Pending Action"
        ),
        React.createElement(UserMenu, {
          loginUser: this.props.loginUser,
          logoutUser: this.props.logoutUser,
          currentUser: this.props.currentUser,
          users: this.props.users })
      )
    );
  }
});

module.exports = SideHeaderBar;