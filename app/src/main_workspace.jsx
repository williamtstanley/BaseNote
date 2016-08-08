var React = require('react');
var MainHeaderBar = require('./main_headerbar');

var MainWorkSpace = React.createClass({
  render: function(){
    return (
      <div className="main-work-space">
        <MainHeaderBar addNote={this.props.addNote}/>
        <div className="notepad-container">
          {this.props.notePads} 
        </div>
      </div>
    );
  }
});


module.exports = MainWorkSpace;
