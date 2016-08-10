var React = require('react');
var MainHeaderBar = require('./main_headerbar');
var NoteDisplay = require('./note_display');

var MainWorkSpace = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      { className: 'main-work-space' },
      React.createElement(MainHeaderBar, {
        addNote: this.props.addNote,
        toggleSearch: this.props.toggleSearch
      }),
      React.createElement(
        'div',
        { className: 'notepad-container' },
        this.props.notes,
        this.props.notePads
      )
    );
  }
});

module.exports = MainWorkSpace;