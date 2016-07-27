var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
var MainWorkSpace = require('./main_workspace');
var SideBar = require('./sidebar');

Electron.ipcRenderer.on('ping', (event, message) => {
  console.log(message);
});

var App = React.createClass({
  getInitialState: function () {
    return {
      display: "block"
    };
  },
  toggleVis: function () {
    //do stuff here
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'window' },
      React.createElement(SideBar, {
        display: this.state.display
      }),
      React.createElement(MainWorkSpace, null)
    );
  }
});

ReactDom.render(React.createElement(App, null), document.getElementById('main-container'));