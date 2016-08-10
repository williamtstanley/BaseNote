var React = require('react');
var SearchField = require('./search_field');

var SearchSideBar = React.createClass({
  render: function(){
    var styles = {
      display: this.props.open ? 'block' : 'none'
    }
    return (
      <div style={styles} className="search" >
        <span className="header-title">Company Search</span>
        <SearchField searchSelect={this.props.searchSelect}/>
      </div>
    );
  }
});

module.exports = SearchSideBar;
