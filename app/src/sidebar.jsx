var React = require('react');
var NoteBlock = require('./note_block');
var SideHeaderBar = require('./side_headerbar');

var $ = require('jQuery');

var SideBar = React.createClass({
  render: function(){
    var notes = this.props.notes.map(function(note){
      return <NoteBlock key={note._id} 
                        note={note}
                        noteSelect={this.props.noteSelect}
                        createdBy={"William Stanley(placeholder)"} />
                        }.bind(this));
    return (
      <div className="side-bar" >
        <SideHeaderBar />
        <div className="note-block-container">
          {notes}
        </div>
      </div>
    );
  }
});

module.exports = SideBar;
