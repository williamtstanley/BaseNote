var React = require('react');

var SideBar = React.createClass({
  getInitialState: function () {
    return {
      windowHeight: window.innerHeight
    };
  },
  handleResize: function () {
    this.setState({ windowHeight: window.innerHeight });
  },
  componentDidMount: function () {
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleResize);
  },
  sideToggle: function () {
    // do stuff here 
  },
  render: function () {
    var styles = {
      minHeight: this.state.windowHeight,
      display: this.props.display
    };
    return React.createElement(
      'div',
      { style: styles, className: 'side-bar', onClick: this.sideToggle },
      React.createElement(
        'h1',
        null,
        'Side Bar'
      ),
      React.createElement(
        'div',
        null,
        'Current window height: ',
        this.state.windowHeight,
        ' '
      )
    );
  }
});

module.exports = SideBar;