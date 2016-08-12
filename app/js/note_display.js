var React = require('react');

var NoteDisplay = React.createClass({
  getInitialState: function () {
    return {
      completed: this.props.note.completed
    };
  },
  renderHtmlString: function (htmlString) {
    return { __html: htmlString };
  },
  closeNoteDisplay: function () {
    this.props.closeNoteDisplay();
  },
  updateNote: function () {
    this.props.completeNote(this.props.note._id);
    this.setState({ completed: true });
  },
  render: function () {
    var completed = this.state.completed ? "True" : "False";
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
          { id: "company-label" },
          "Company: "
        ),
        this.props.company.name,
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
      ),
      React.createElement(
        "div",
        { className: "note-display-footer" },
        React.createElement(
          "div",
          null,
          "Completed: ",
          React.createElement(
            "button",
            { onClick: this.updateNote },
            completed
          )
        )
      )
    );
  }
});

module.exports = NoteDisplay;