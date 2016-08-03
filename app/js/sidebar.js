var React = require('react');
var NoteBlock = require('./note_block');
var SideHeaderBar = require('./side_headerbar');

var $ = require('jQuery');

var SideBar = React.createClass({
  render: function () {
    var styles = {
      display: this.props.display
    };
    var notes = this.props.notes.map(function (note) {
      return React.createElement(NoteBlock, { key: note._id,
        title: note.title,
        createdBy: "William Stanley(placeholder)" });
    });
    return React.createElement(
      'div',
      { style: styles, className: 'side-bar' },
      React.createElement(SideHeaderBar, null),
      notes
    );
  }
});

module.exports = SideBar;