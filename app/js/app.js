var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
Electron.ipcRenderer.on('ping', (event, message) => {
  console.log(message); // Prints 'whoooooooh!'
});
var SideBar = React.createClass({
  getInitialState: function () {
    return {
      display: 'block',
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
    // if (this.state.display === 'block'){
    //   this.setState({
    //     display: 'none'
    //   })
    // }else{
    //   this.setState({
    //     display: 'block'
    //   })
    // }
    console.log(window.innerHeight);
  },
  render: function () {
    var styles = {
      minHeight: this.state.windowHeight,
      display: this.state.display
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

var MainWorkSpace = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      { className: 'main-work-space' },
      React.createElement(
        'h1',
        null,
        'Main Work Space'
      )
    );
  }
});

var App = React.createClass({
  render: function () {
    return React.createElement(
      'div',
      { className: 'window' },
      React.createElement(SideBar, null),
      React.createElement(MainWorkSpace, null)
    );
  }
});

ReactDom.render(React.createElement(App, null), document.getElementById('main-container'));