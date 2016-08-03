var React = require('react');

var Divider = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      { className: 'divider' },
      React.createElement(
        'div',
        { onClick: this.props.toggleVis, id: 'sidebar-toggle' },
        React.createElement('div', { className: 'icon-toggle-bar left-bar' }),
        React.createElement('div', { className: 'icon-toggle-bar right-bar' })
      )
    );
  }
});

module.exports = Divider;