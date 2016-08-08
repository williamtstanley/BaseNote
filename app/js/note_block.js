var React = require('react');

var NoteBlock = React.createClass({
  getInitialState: function () {
    return {
      clicked: false
    };
  },
  handleClick: function () {
    var that = this;
    this.props.noteSelect(this.props.note._id);
    setTimeout(function () {
      that.state.clicked ? that.setState({ clicked: false }) : that.setState({ clicked: true });
    }, 150);
  },
  render: function () {
    var tooltipStyle = {
      display: this.state.clicked ? 'block' : 'none'
    };
    return React.createElement(
      'div',
      { onClick: this.handleClick, className: 'note-block' },
      React.createElement(
        'div',
        null,
        this.props.note.subject
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: tooltipStyle },
          'control buttons go here?'
        )
      )
    );
  }
});

module.exports = NoteBlock;