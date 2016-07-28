var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
var MainWorkSpace = require('./main_workspace');
var SideBar = require('./sidebar');

const shell = require('electron').shell;
const os = require('os');

Electron.ipcRenderer.on('ping', (event, message) => {
  console.log(message);
});

var App = React.createClass({
  getInitialState: function () {
    return {
      windowHeight: window.innerHeight,
      display: "block"
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
  toggleVis: function () {
    if (this.state.display === "block") {
      this.setState({ display: "none" });
    } else {
      this.setState({ display: "block" });
    }
  },
  //Allows access to the open file window opens selected file in the default application
  openFile: function () {
    shell.showItemInFolder(os.homedir());
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'window' },
      React.createElement(SideBar, {
        display: this.state.display,
        windowHeight: this.state.windowHeight
      }),
      React.createElement(MainWorkSpace, {
        toggleVis: this.toggleVis,
        openFile: this.openFile
      })
    );
  }
});

ReactDom.render(React.createElement(App, null), document.getElementById('main-container'));