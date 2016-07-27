var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron')
Electron.ipcRenderer.on('ping', (event, message) => {
   console.log(message)  // Prints 'whoooooooh!'
  })
var SideBar = React.createClass({
  getInitialState: function(){
    return {
      display: 'block',
      windowHeight: window.innerHeight
    };
  },
  handleResize: function(){
    this.setState({windowHeight: window.innerHeight});
  },
  componentDidMount: function(){
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function(){
    window.removeEventListener('resize', this.handleResize);
  },
  sideToggle: function(){
    // if (this.state.display === 'block'){
    //   this.setState({
    //     display: 'none'
    //   })
    // }else{
    //   this.setState({
    //     display: 'block'
    //   })
    // }
    console.log(window.innerHeight)
  },
  render: function(){
    var styles = {
      minHeight: this.state.windowHeight,
      display: this.state.display
    }
    return (
      <div style={styles} className="side-bar" onClick={this.sideToggle}>
        <h1>Side Bar</h1>
        <div>Current window height: {this.state.windowHeight} </div>
      </div>
    );
  }
});

var MainWorkSpace = React.createClass({
  render: function(){
    return (
      <div className="main-work-space">
        <h1>Main Work Space</h1>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="window">
        <SideBar />
        <MainWorkSpace />
      </div>
    );
  }
});

ReactDom.render(<App/>, document.getElementById('main-container'));
