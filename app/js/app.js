var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
var MainWorkSpace = require('./main_workspace');
var SideBar = require('./sidebar');
var Divider = require('./divider');
const shell = require('electron').shell;
const os = require('os');

Electron.ipcRenderer.on('ping', (event, message) => {
  console.log(message);
});

var App = React.createClass({
  getInitialState: function () {
    return {
      display: "block",
      notes: []
    };
  },
  componentDidMount: function () {
    var that = this;
    const URL = "http://localhost:3000/api/notes";
    //Fetch all notes at the moment - no filtering at all
    var req = new Request(URL, { method: 'GET', cache: 'reload' });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      that.setState({ notes: json.notes });
    });
  },
  toggleVis: function () {
    if (this.state.display === "block") {
      this.setState({ display: "none" });
    } else {
      this.setState({ display: "block" });
    }
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'window' },
      React.createElement(SideBar, {
        display: this.state.display,
        notes: this.state.notes }),
      React.createElement(Divider, { toggleVis: this.toggleVis }),
      React.createElement(MainWorkSpace, {
        openFile: this.openFile
      })
    );
  }
});

ReactDom.render(React.createElement(App, null), document.getElementById('main-container'));