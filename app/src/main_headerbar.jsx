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
          <span onClick={this.props.addNote}><i className="fa fa-plus" aria-hidden="true"></i></span>
          <span onClick={this.props.toggleSearch}><i className="fa fa-search" aria-hidden="true"></i></span>
        </div>
      </div>
    )
  }
})


module.exports = MainHeaderBar;;

