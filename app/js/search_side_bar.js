var React = require('react');
var SearchField = require('./search_field');
var NoteBlock = require('./note_block');
var CompletedSideBar = require('./completed_notes');

var SearchSideBar = React.createClass({
  render: function () {
    var styles = {
      display: this.props.open ? 'block' : 'none'
    };
    var notes = this.props.companyNotes.map(function (note) {
      return React.createElement(NoteBlock, {
        key: note._id,
        note: note,
        noteSelect: this.props.noteSelect
      });
    }.bind(this));

    return React.createElement(
      'div',
      { style: styles, className: 'search' },
      React.createElement(
        'span',
        { className: 'header-title' },
        'Company Search'
      ),
      React.createElement(SearchField, {
        searchSelect: this.props.searchSelect,
        companies: this.props.companies
      }),
      React.createElement(
        'div',
        { className: 'note-block-container' },
        notes
      ),
      React.createElement(CompletedSideBar, {
        filterCompletedNotes: this.props.filterCompanyCompletedNotes,
        completedNotes: this.props.companyCompletedNotes,
        noteSelect: this.props.noteSelect
      })
    );
  }
});

module.exports = SearchSideBar;