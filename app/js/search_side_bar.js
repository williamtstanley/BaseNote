var React = require('react');
var SearchField = require('./search_field');

var SearchSideBar = React.createClass({
  render: function () {
    var styles = {
      display: this.props.open ? 'block' : 'none'
    };
    return React.createElement(
      'div',
      { style: styles, className: 'search' },
      React.createElement(
        'span',
        { className: 'header-title' },
        'Company Search'
      ),
      React.createElement(SearchField, { searchSelect: this.props.searchSelect })
    );
  }
});

module.exports = SearchSideBar;