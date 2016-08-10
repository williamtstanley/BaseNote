var React = require('react');

var SearchSideBar = React.createClass({
  render: function(){
    var styles = {
      display: this.props.open ? 'block' : 'none'
    }
    return (
      <div style={styles} className="search" >
        this is the company note search machine
      </div>
    );
  }
});

module.exports = SearchSideBar;
