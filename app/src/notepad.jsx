var React = require('react');
var ReactQuill = require('react-quill');
var SearchField = require('./search_field')

var NotePad = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.text,
      company: {}
    }
  },
  focusEditor: function(){
    this.refs.editor.focus();
  },
  onTextChange: function(value) {
    this.setState({ text:value });
  },
  saveNote: function(){
    var data = {
      subject: this.refs.subject.value,
      company_id: this.state.company._id,
      body: this.state.text
    }
    this.props.saveNote(data);
    this.closeNote();
  },
  closeNote: function(){
    this.props.removeNote(this.props.dataId)
  },
  noteSearchSelect: function(company){
    this.setState({company: company})
  },
  render: function() {
    return (
      <div className="note">
        <div className="input-container">
          <span>Subject:</span>
          <input ref="subject" className="text-input" name="subject" type="text" />
          <span>Company: </span>
          <SearchField 
            id="search-container"
            companies={this.props.companies}
            noteSearchSelect={this.noteSearchSelect}
          />
          <span className="close-btn" onClick={this.closeNote}><i className="fa fa-times" aria-hidden="true"></i></span>
        </div>  
        <div>
          <div onClick={this.focusEditor}>
            <ReactQuill className="note" 
                        theme="snow"
                        ref="editor"
                        value={this.state.text}
                        onChange={this.onTextChange} />
          </div>
          <div onClick={this.saveNote}className="button-container"><button><i className="fa fa-floppy-o" aria-hidden="true"></i><span>Save</span></button></div>
        </div>
      </div>
    );
  }
});

module.exports = NotePad;
