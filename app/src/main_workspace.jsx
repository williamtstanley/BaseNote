var React = require('react');

var MainWorkSpace = React.createClass({
  render: function(){
    return (
      <div className="main-work-space">
        <button onClick={this.props.toggleVis}>Toggle</button>
        <h1>Main Work Space</h1>
      </div>
    );
  }
});


module.exports = MainWorkSpace;
