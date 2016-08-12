var React = require('react');
var moment = require('moment');

var NoteBlock = React.createClass({
  getInitialState: function () {
    return {
      clicked: false
    };
  },
  handleClick: function () {
    this.props.noteSelect(this.props.note._id);
  },
  render: function () {
    return React.createElement(
      'div',
      { onClick: this.handleClick, className: 'note-block' },
      React.createElement(
        'div',
        null,
        this.props.note.subject
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          'Created: ',
          moment(this.props.note.created_at).format("MMM-DD-YYYY")
        )
      )
    );
  }
});

module.exports = NoteBlock;