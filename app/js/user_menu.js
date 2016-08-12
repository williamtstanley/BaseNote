var React = require('react');
var Select = require('react-select');

var UserMenu = React.createClass({
  getInitialState: function () {
    return {
      open: false,
      currentUser: this.props.currentUser,
      users: [],
      options: [],
      value: { value: "default", label: "Please select a user" }
    };
  },
  menuClick: function () {
    this.state.open ? this.setState({ open: false }) : this.setState({ open: true });
    var options = this.props.users.map(function (user) {
      return { value: user._id, label: user.firstName + " " + user.lastName };
    });
    this.setState({ options: options, users: this.props.users });
  },
  logChange: function (val) {
    var user = this.state.users.filter(function (user) {
      return val.value === user._id;
    });
    this.setState({ value: val, currentUser: user[0] }, function () {
      this.props.loginUser(this.state.currentUser);
    });
  },
  logoutBtnClick: function () {
    this.props.logoutUser();
  },
  render: function () {
    var menuStyle = {
      display: this.state.open ? 'block' : 'none'
    };
    return React.createElement(
      'div',
      { className: 'user-control-container' },
      React.createElement(
        'span',
        null,
        this.props.currentUser.firstName + " " + this.props.currentUser.lastName
      ),
      React.createElement(
        'span',
        { style: { float: "right" }, onClick: this.menuClick },
        React.createElement('i', { className: 'fa fa-bars', 'aria-hidden': 'true' })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: menuStyle },
          React.createElement(Select, {
            name: 'form-field-name',
            value: this.state.value,
            options: this.state.options,
            onChange: this.logChange
          }),
          React.createElement(
            'button',
            { onClick: this.logoutBtnClick },
            'Logout'
          )
        )
      )
    );
  }
});

module.exports = UserMenu;