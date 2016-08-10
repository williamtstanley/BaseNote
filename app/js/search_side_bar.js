var React = require('react');

var SearchSideBar = React.createClass({
  render: function () {
    var styles = {
      display: this.props.open ? 'block' : 'none'
    };
    return React.createElement(
      'div',
      { style: styles, className: 'search' },
      'this is the company note search machine'
    );
  }
});

module.exports = SearchSideBar;