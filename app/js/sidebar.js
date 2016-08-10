var React = require('react');
var NoteBlock = require('./note_block');
var SideHeaderBar = require('./side_headerbar');

var $ = require('jQuery');

var SideBar = React.createClass({
  render: function () {
    var notes = this.props.notes.map(function (note) {
      return React.createElement(NoteBlock, { key: note._id,
        note: note,
        noteSelect: this.props.noteSelect
      });
    }.bind(this));
    return React.createElement(
      'div',
      { className: 'side-bar' },
      React.createElement(SideHeaderBar, {
        users: this.props.users,
        currentUser: this.props.currentUser,
        loginUser: this.props.loginUser,
        logoutUser: this.props.logoutUser
      }),
      React.createElement(
        'div',
        { className: 'note-block-container' },
        notes
      )
    );
  }
});

module.exports = SideBar;