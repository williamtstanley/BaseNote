var React = require('react');
var ReactQuill = require('react-quill');

var NotePad = React.createClass({
  getInitialState: function () {
    return {
      text: this.props.text
    };
  },
  focusEditor: function () {
    this.refs.editor.focus();
  },
  onTextChange: function (value) {
    this.setState({ text: value });
  },
  saveNote: function () {
    var data = {
      subject: this.refs.subject.value,
      body: this.state.text
    };
    this.props.saveNote(data);
    this.closeNote();
  },
  closeNote: function () {
    this.props.removeNote(this.props.dataId);
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'note' },
      React.createElement(
        'div',
        { className: 'input-container' },
        React.createElement(
          'span',
          null,
          'Subject:'
        ),
        React.createElement('input', { ref: 'subject', className: 'text-input', name: 'subject', type: 'text' }),
        React.createElement(
          'span',
          { style: { float: "right" }, onClick: this.closeNote },
          React.createElement('i', { className: 'fa fa-times', 'aria-hidden': 'true' })
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { onClick: this.focusEditor },
          React.createElement(ReactQuill, { className: 'note',
            theme: 'snow',
            ref: 'editor',
            value: this.state.text,
            onChange: this.onTextChange })
        ),
        React.createElement(
          'div',
          { onClick: this.saveNote, className: 'button-container' },
          React.createElement(
            'button',
            null,
            React.createElement('i', { className: 'fa fa-floppy-o', 'aria-hidden': 'true' }),
            React.createElement(
              'span',
              null,
              'Save'
            )
          )
        )
      )
    );
  }
});

module.exports = NotePad;