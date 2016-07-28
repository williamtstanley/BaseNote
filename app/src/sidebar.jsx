var React = require('react');

var SideBar = React.createClass({
  render: function(){
    var styles = {
      minHeight: this.props.windowHeight,
      display: this.props.display
    }
    return (
      <div style={styles} className="side-bar" >
        <h1>Side Bar</h1>
      </div>
    );
  }
});

module.exports = SideBar;
