var React = require('react');

var SideBar = React.createClass({
  getInitialState: function(){
    return {
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
    // do stuff here 
  },
  render: function(){
    var styles = {
      minHeight: this.state.windowHeight,
      display: this.props.display
    }
    return (
      <div style={styles} className="side-bar" onClick={this.sideToggle}>
        <h1>Side Bar</h1>
        <div>Current window height: {this.state.windowHeight} </div>
      </div>
    );
  }
});

module.exports = SideBar;
