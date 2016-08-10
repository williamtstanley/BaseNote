var React = require('react');
var Select = require('react-select');

var UserControlDropDown = React.createClass({
  getInitialState: function () {
    return {
      users: [],
      options: [{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]
    };
  },
  componentDidMount: function () {
    console.log(this.props.users);
    var options = this.props.users.map(function (user) {
      return { value: user.firstName, label: user.firstname, id: user._id };
    });
  },
  logChange: function (val) {
    console.log("Selected: " + val);
    console.log(this.props.users);
  },
  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(Select, {
        name: 'form-field-name',
        value: 'one',
        options: this.state.options,
        onChange: this.logChange }),
      'fuck!'
    );
  }
});

module.exports = UserControlDropDown;