var React = require('react');

var NoteBlock = React.createClass({
  getInitialState: function () {
    return {
      clicked: false
    };
  },
  handleClick: function () {
    var that = this;
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
        this.props.title
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: tooltipStyle },
          this.props.createdBy
        )
      )
    );
  }
});

module.exports = NoteBlock;