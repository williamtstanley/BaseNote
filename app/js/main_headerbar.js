var React = require('react');
const remote = require('electron').remote;

var MainHeaderBar = React.createClass({
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
          'WorkSpace'
        )
      ),
      React.createElement(
        'div',
        { className: 'header-bar-btns' },
        React.createElement(
          'button',
          { id: 'note-btn', onClick: this.maximize },
          '+'
        )
      )
    );
  }
});

module.exports = MainHeaderBar;;