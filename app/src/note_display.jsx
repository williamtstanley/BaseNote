var React = require('react');

var NoteDisplay = React.createClass({
  renderHtmlString: function(htmlString){
    return {__html: htmlString};
  },
  closeNoteDisplay: function(){
    this.props.closeNoteDisplay();
  },
  render: function(){
    return (
      <div className="note-display">
        <div id= "subject-container">
          <span id="subject-label">Subject:</span>
          {this.props.note.subject}
          <span style={{float: "right"}}onClick={this.closeNoteDisplay}><i className="fa fa-times" aria-hidden="true"></i></span>
        </div>
        <div id= "note-body-container" >
          <div id= "body-label">Body: </div>
          <div id= "body-text" dangerouslySetInnerHTML={this.renderHtmlString(this.props.note.body)} />
        </div>
      </div>
        );
  }
})

module.exports = NoteDisplay;
