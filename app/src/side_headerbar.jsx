var React = require('react');
const remote = require('electron').remote;

var SideHeaderBar = React.createClass({
  render: function(){
    return (
      <div className="header-bar header-bar-left">
        <div>
          <span className="header-title">Pending Action</span> 
        </div>
      </div>
    )
  }
})


module.exports = SideHeaderBar;

