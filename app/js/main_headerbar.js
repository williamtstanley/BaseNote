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
          'span',
          { onClick: this.props.addNote },
          React.createElement('i', { className: 'fa fa-plus', 'aria-hidden': 'true' })
        ),
        React.createElement(
          'span',
          { onClick: this.props.toggleSearch },
          React.createElement('i', { className: 'fa fa-search', 'aria-hidden': 'true' })
        )
      )
    );
  }
});

module.exports = MainHeaderBar;;