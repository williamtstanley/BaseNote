var React = require('react');
var NoteBlock = require('./note_block');

var CompletedSideBar = React.createClass({
  getInitialState: function(){
    return {
      open: false
    };
  },
  menuClick: function(){
    this.props.filterCompletedNotes();
    this.state.open ? this.setState({open: false}) : this.setState({open: true})
  },
  render: function(){
    var notes = this.props.completedNotes.map(function(note){
      return <NoteBlock key={note._id} 
                        note={note}
                        noteSelect={this.props.noteSelect}
                         />
    }.bind(this));
    var completedStyle = {
      display: this.state.open ? 'block' : 'none'
    };
    return (
      <div className="completed-notes" >
        <div className="completed-header">
          <span className="header-title">Completed</span>
          <span style={{float: "right", marginRight: 3}} onClick={this.menuClick}><i className="fa fa-bars" aria-hidden="true"></i></span>
        </div> 
        <div style={completedStyle} className="note-block-container">
          {notes}
        </div>
      </div>
    );
  }
});

module.exports = CompletedSideBar;
