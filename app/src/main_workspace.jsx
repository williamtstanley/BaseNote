var React = require('react');
var MainHeaderBar = require('./main_headerbar');
var NotePad = require('./notepad');

var MainWorkSpace = React.createClass({
  render: function(){
    return (
      <div className="main-work-space">
        <MainHeaderBar />
        <div className="notepad-container">
          <NotePad />
        </div>
      </div>
    );
  }
});


module.exports = MainWorkSpace;
