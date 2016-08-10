var React = require('react');
var MainHeaderBar = require('./main_headerbar');
var NoteDisplay = require('./note_display');

var MainWorkSpace = React.createClass({
  render: function(){
    return (
      <div className="main-work-space">
        <MainHeaderBar 
          addNote={this.props.addNote}
          toggleSearch={this.props.toggleSearch}
        />
        <div className="notepad-container">
          {this.props.notes}
          {this.props.notePads} 
        </div>
      </div>
    );
  }
});


module.exports = MainWorkSpace;
