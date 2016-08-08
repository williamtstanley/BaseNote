var React = require('react');

var NoteBlock = React.createClass({
  getInitialState: function(){
    return {
      clicked: false
    };
  },
  handleClick: function() {
    var that = this
    this.props.noteSelect(this.props.note._id);
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
        <div>{this.props.note.subject}</div>
        <div>
          <div style={tooltipStyle}>control buttons go here?</div>
        </div>
      </div>
    );
  }
})

module.exports = NoteBlock;
