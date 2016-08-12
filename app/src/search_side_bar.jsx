var React = require('react');
var SearchField = require('./search_field');
var NoteBlock = require('./note_block');
var CompletedSideBar = require('./completed_notes');

var SearchSideBar = React.createClass({
  render: function(){
    var styles = {
      display: this.props.open ? 'block' : 'none'
    }
    var notes = this.props.companyNotes.map(function(note){
      return <NoteBlock 
               key={note._id} 
               note={note}
               noteSelect={this.props.noteSelect}
              />
      }.bind(this));

    return (
      <div style={styles} className="search" >
        <span className="header-title">Company Search</span>
        <SearchField 
          searchSelect={this.props.searchSelect}
          companies={this.props.companies}
        />
        <div className="note-block-container">
          {notes}
        </div>
        <CompletedSideBar
          filterCompletedNotes={this.props.filterCompanyCompletedNotes}
          completedNotes={this.props.companyCompletedNotes}
          noteSelect={this.props.noteSelect}
        />
      </div>
    );
  }
});

module.exports = SearchSideBar;
