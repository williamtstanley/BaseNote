var React = require('react');
var NoteBlock = require('./note_block');
var SideHeaderBar = require('./side_headerbar');
var CompletedSideBar = require('./completed_notes');

var SideBar = React.createClass({
  render: function(){
    var notes = this.props.notes.map(function(note){
      return <NoteBlock key={note._id} 
                        note={note}
                        noteSelect={this.props.noteSelect}
                         />
                        }.bind(this));
    return (
      <div className="side-bar" >
        <SideHeaderBar
          users={this.props.users}
          currentUser={this.props.currentUser}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <div className="note-block-container">
          {notes}
        </div>
        <CompletedSideBar
          filterCompletedNotes={this.props.filterUserCompletedNotes}
          completedNotes={this.props.userCompletedNotes}
          noteSelect={this.props.noteSelect}
        />
      </div>
    );
  }
});

module.exports = SideBar;
