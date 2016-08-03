var React = require('react');
var ReactQuill = require('react-quill');

var NotePad = React.createClass({
  getInitialState: function () {
    return {
      value: ""
    };
  },
  onTextChange: function (value) {
    this.setState({ text: value });
    console.log(value);
  },
  render: function () {
    return React.createElement(ReactQuill, { className: 'note',
      theme: 'snow',
      value: this.state.text,
      onChange: this.onTextChange });
  }
});

module.exports = NotePad;