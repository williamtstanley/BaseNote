var React = require('react');

var Divider = React.createClass({
  render: function(){
    return (
      <div className='divider' >
        <div onClick={this.props.toggleVis} id='sidebar-toggle'>
          <div className='icon-toggle-bar left-bar'></div>
          <div className='icon-toggle-bar right-bar'></div>
        </div>
      </div>
    );
  }
});

module.exports = Divider;
