var React = require('react');
var MainHeaderBar = require('./main_headerbar');
var NotePad = require('./notepad');

var MainWorkSpace = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      { className: 'main-work-space' },
      React.createElement(MainHeaderBar, null),
      React.createElement(
        'div',
        { className: 'notepad-container' },
        React.createElement(NotePad, null)
      )
    );
  }
});

module.exports = MainWorkSpace;