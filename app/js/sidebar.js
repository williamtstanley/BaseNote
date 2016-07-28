var React = require('react');

var SideBar = React.createClass({
  render: function () {
    var styles = {
      minHeight: this.props.windowHeight,
      display: this.props.display
    };
    return React.createElement(
      "div",
      { style: styles, className: "side-bar" },
      React.createElement(
        "h1",
        null,
        "Side Bar"
      )
    );
  }
});

module.exports = SideBar;