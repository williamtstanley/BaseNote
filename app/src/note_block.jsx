var React = require('react');
var moment = require('moment');

var NoteBlock = React.createClass({
  getInitialState: function(){
    return {
      clicked: false
    };
  },
  handleClick: function() {
    this.props.noteSelect(this.props.note._id);
  },
  render: function(){
    return (
      <div onClick={this.handleClick} className="note-block">
        <div>{this.props.note.subject}</div>
        <div>
          <div>Created: {moment(this.props.note.created_at).format("MMM-DD-YYYY")}</div>
        </div>
      </div>
    );
  }
})

module.exports = NoteBlock;
