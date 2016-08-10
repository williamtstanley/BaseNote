var React = require('react');

var NoteDisplay = React.createClass({
  renderHtmlString: function (htmlString) {
    return { __html: htmlString };
  },
  closeNoteDisplay: function () {
    this.props.closeNoteDisplay();
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "note-display" },
      React.createElement(
        "div",
        { id: "subject-container" },
        React.createElement(
          "span",
          { id: "subject-label" },
          "Subject:"
        ),
        this.props.note.subject,
        React.createElement(
          "span",
          { style: { float: "right" }, onClick: this.closeNoteDisplay },
          React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
        )
      ),
      React.createElement(
        "div",
        { id: "note-body-container" },
        React.createElement(
          "div",
          { id: "body-label" },
          "Body: "
        ),
        React.createElement("div", { id: "body-text", dangerouslySetInnerHTML: this.renderHtmlString(this.props.note.body) })
      )
    );
  }
});

module.exports = NoteDisplay;