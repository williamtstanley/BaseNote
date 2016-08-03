var React = require('react');
const remote = require('electron').remote;

var MainHeaderBar = React.createClass({
  render: function(){
    return (
      <div className="header-bar">
        <div>
          <span className="header-title">WorkSpace</span> 
        </div>
        <div className="header-bar-btns">
          <button id="note-btn" onClick={this.maximize}>+</button>
        </div>
      </div>
    )
  }
})


module.exports = MainHeaderBar;;

