var React = require('react');

var NoteBlock = React.createClass({
  getInitialState: function(){
    return {
      clicked: false
    };
  },
  handleClick: function() {
    var that = this
    setTimeout(function(){
      that.state.clicked ? that.setState({ clicked: false }) : that.setState({clicked: true})
    }, 150);
  },
  render: function(){
    var tooltipStyle = {
      display: this.state.clicked ? 'block' : 'none'
    }
    return (
      <div onClick={this.handleClick} className="note-block">
        <div>{this.props.title}</div>
        <div>
          <div style={tooltipStyle}>{this.props.createdBy}</div>
        </div>
      </div>
    );
  }
})

module.exports = NoteBlock;
