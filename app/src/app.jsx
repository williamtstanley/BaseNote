var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
var MainWorkSpace = require('./main_workspace');
var SideBar = require('./sidebar');

Electron.ipcRenderer.on('ping', (event, message) => {
   console.log(message)
  })

var App = React.createClass({
  getInitialState: function(){
    return {
      display: "block"
    }
  },
  toggleVis: function(){
    //do stuff here
  },
  render: function() {
    return (
      <div className="window">
        <SideBar
          display={this.state.display}  
        />
        <MainWorkSpace
        />
      </div>
    );
  }
});

ReactDom.render(<App/>, document.getElementById('main-container'));
