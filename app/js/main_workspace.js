var React = require('react');

var MainWorkSpace = React.createClass({
  render: function () {
    return React.createElement(
      "div",
      { className: "main-work-space" },
      React.createElement(
        "h1",
        null,
        "Main Work Space"
      )
    );
  }
});

module.exports = MainWorkSpace;