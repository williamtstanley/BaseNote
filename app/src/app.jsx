var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
var MainWorkSpace = require('./main_workspace');
var SideBar = require('./sidebar');
var NotePad = require('./notepad');


const shell = require('electron').shell;
const os = require('os');
const apiUrl = "http://localhost:3000/api/notes";

Electron.ipcRenderer.on('ping', (event, message) => {
   console.log(message)
  })

var App = React.createClass({
  getInitialState: function(){
    return {
      notes: [],
      note: {},
      notePadCount: 0,
      notePads: []
    };
  },
  componentDidMount: function () {
   this.getNotes();
  },
  getNotes: function() {
    var that = this;
    //Fetch all notes at the moment - no filtering at all
    var req = new Request(apiUrl, { method: 'GET', cache: 'reload' });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      that.setState({ notes: json.notes });
    });
  },
  saveNote: function(data){
    var that = this;
    var notes = this.state.notes;
    note = JSON.stringify(data)
    fetch(apiUrl, {  
      method: 'post',  
      headers: {  
        "content-type": "application/json"  
        },  
      body: note  
    })
    .then(function(response){
      return response.json();
    })
    .then(function (data) {
      notes.push(data.note)  
      console.log('Request succeeded with JSON response', data);
      that.setState({
        notes: notes
      })  
    })  
    .catch(function (error) {  
      console.log('Request failed', error);  
    });
  },
  noteSelect: function(id){
    console.log("note selected: " + id);
    var note = this.state.notes.filter(function(note){
      return id === note._id
    });
    console.log(note);
    this.setState({
      note: note
    });
  },
  renderNote: function(text=""){
    var notePad = <NotePad
                    text={text}
                    key={this.state.notePadCount}
                    dataId={this.state.notePadCount}
                    saveNote={this.props.saveNote}
                    removeNote={this.removeNote}
                    renderNote={this.renderNote}
                  />;
    var notePads = this.state.notePads
    notePads.push(notePad)
    this.setState({
                   notePads: notePads, 
                   notePadCount: this.state.notePadCount += 1
    });
    console.log("rendering new notePad")
  },
  addNote: function(){
   this.renderNote();
  },
  removeNote: function(id){
    notePads = this.state.notePads.filter(function(element){
      return id !== element.props.dataId;
    });
    this.setState({
      notePads: notePads
    });
    console.log("Removing notePad");
  },
  render: function() {
    return (
      <div className="window">
        <SideBar
          noteSelect={this.noteSelect}
          notes={this.state.notes} />
        <MainWorkSpace
          addNote={this.addNote}
          note={this.state.note}
          saveNote={this.saveNote}
          openFile={this.openFile}
          notePads={this.state.notePads}
        />
      </div>
    );
  }
});

ReactDom.render(<App/>, document.getElementById('main-container'));
