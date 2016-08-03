var React = require('react');
const remote = require('electron').remote;

var SideHeaderBar = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      { className: 'header-bar' },
      React.createElement(
        'div',
        null,
        React.createElement(
          'span',
          { className: 'header-title' },
          'Pending Action'
        )
      )
    );
  }
});

module.exports = SideHeaderBar;