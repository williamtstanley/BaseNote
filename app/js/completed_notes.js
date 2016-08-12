var React = require('react');
var NoteBlock = require('./note_block');

var CompletedSideBar = React.createClass({
  getInitialState: function () {
    return {
      open: false
    };
  },
  menuClick: function () {
    this.props.filterCompletedNotes();
    this.state.open ? this.setState({ open: false }) : this.setState({ open: true });
  },
  render: function () {
    var notes = this.props.completedNotes.map(function (note) {
      return React.createElement(NoteBlock, { key: note._id,
        note: note,
        noteSelect: this.props.noteSelect
      });
    }.bind(this));
    var completedStyle = {
      display: this.state.open ? 'block' : 'none'
    };
    return React.createElement(
      'div',
      { className: 'completed-notes' },
      React.createElement(
        'div',
        { className: 'completed-header' },
        React.createElement(
          'span',
          { className: 'header-title' },
          'Completed'
        ),
        React.createElement(
          'span',
          { style: { float: "right", marginRight: 3 }, onClick: this.menuClick },
          React.createElement('i', { className: 'fa fa-bars', 'aria-hidden': 'true' })
        )
      ),
      React.createElement(
        'div',
        { style: completedStyle, className: 'note-block-container' },
        notes
      )
    );
  }
});

module.exports = CompletedSideBar;