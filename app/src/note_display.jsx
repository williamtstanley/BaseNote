var React = require('react');

var NoteDisplay = React.createClass({
  getInitialState: function(){
    return {
      completed: this.props.note.completed
    }
  },
  renderHtmlString: function(htmlString){
    return {__html: htmlString};
  },
  closeNoteDisplay: function(){
    this.props.closeNoteDisplay();
  },
  updateNote: function(){
    this.props.completeNote(this.props.note._id)
    this.setState({completed: true});
  },
  render: function(){
    var completed = this.state.completed ? "True" : "False"
    return (
      <div className="note-display">
        <div id= "subject-container">
          <span id="subject-label">Subject:</span>
          {this.props.note.subject}
          <span id="company-label">Company: </span>
          {this.props.company.name}
          <span style={{float: "right"}}onClick={this.closeNoteDisplay}><i className="fa fa-times" aria-hidden="true"></i></span>
        </div>
        <div id= "note-body-container" >
          <div id= "body-label">Body: </div>
          <div id= "body-text" dangerouslySetInnerHTML={this.renderHtmlString(this.props.note.body)} />
        </div>
        <div className="note-display-footer">
          <div>Completed: <button onClick={this.updateNote}>{completed}</button></div>
        </div>
      </div>
        );
  }
})

module.exports = NoteDisplay;
