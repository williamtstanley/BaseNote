var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
var MainWorkSpace = require('./main_workspace');
var SideBar = require('./sidebar');
var NotePad = require('./notepad');
var NoteDisplay = require('./note_display');
var Search = require('./search_side_bar');

var fs = require("fs");

var config = require("../js/config.json");

const shell = require('electron').shell;
const os = require('os');
const apiUrl = "http://localhost:3000/api/"; // + "notes" + "users" + "Companies"

Electron.ipcRenderer.on('ping', (event, message) => {
   console.log(message)
  })

var App = React.createClass({
  getInitialState: function(){
    return {
      currentUser: config.user,
      users: [],
      noteList: [],
      masterNoteList: [],
      notes: [],
      notePadCount: 0,
      notePads: [],
      searchOpen: false
    };
  },
  componentWillMount: function () {
    this.getNotes();
    this.getUsers();
  },
  componentWillUpdate: function () {
     console.log('log some 💩')
  },
  getUsers: function() {
    var that = this;
    var req = new Request(apiUrl + "users", { method: 'GET', cache: 'reload' });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      that.setState({ users: json.users });
    });
  },
  getNotes: function(callback) {
    var that = this;
    var req = new Request(apiUrl + "notes", { method: 'GET', cache: 'reload' });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      var tempNoteList = json.notes;
      that.setState({masterNoteList: tempNoteList}, that.filterNotes(tempNoteList))
    });
  },
  saveNote: function(data){
    var that = this;
    var noteList = this.state.noteList;
    var masterNoteList = this.state.masterNoteList;
    data["user_id"] = this.state.currentUser._id
    note = JSON.stringify(data)
    fetch(apiUrl + "notes", {  
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
      masterNoteList.push(data.note)
      noteList.push(data.note)  
      that.setState({
        noteList: noteList,
        masterNoteList: masterNoteList
      })  
    })  
    .catch(function (error) {  
      console.log('Request failed', error);  
    });
  },
  noteSelect: function(id){
    console.log("note selected: " + id);
    var notes = this.state.notes
    var tempNote = this.state.noteList.filter(function(note){
      return id === note._id
    });
    var note = <NoteDisplay 
                 key={tempNote[0]._id} 
                 note={tempNote[0]} 
                 closeNoteDisplay={this.closeNoteDisplay}
               />
    this.setState({
      notes: [note],
      notePads: []
    });
  },
  closeNoteDisplay: function(){
    this.setState({notes: []})
  },
  renderNotePad: function(text=""){
    var notePad = <NotePad
                    text={text}
                    key={this.state.notePadCount}
                    dataId={this.state.notePadCount}
                    saveNote={this.saveNote}
                    removeNote={this.removeNote}
                    renderNote={this.renderNote}
                  />;
    var notePads = this.state.notePads
    notePads.push(notePad)
    this.setState({
                   notes: [],
                   notePads: notePads, 
                   notePadCount: this.state.notePadCount += 1
    });
  },
  addNote: function(){
   this.renderNotePad();
  },
  removeNote: function(id){
    notePads = this.state.notePads.filter(function(element){
      return id !== element.props.dataId;
    });
    this.setState({
      notePads: notePads
    });
  },
  loginUser: function(user){
    console.log("Login and set user in config: " + user.firstName)
    var config = {
      user: user
    };
    fs.writeFile( "./app/js/config.json", JSON.stringify( config ), "utf8", function(){
      this.setState({currentUser: user}, function(){
        this.filterNotes(this.state.masterNoteList);
      }.bind(this))
    }.bind(this))
  },
  logoutUser: function(){
    console.log("Logout User and remove from config")
    config ={
      user: {firstName: "Please", lastName: "Login"}
    }
    this.setState({currentUser: config.user})
    fs.writeFile( "./app/js/config.json", JSON.stringify( config ), "utf8" )
  },
  filterNotes: function(noteList){
    var notes = noteList.filter(function(note){
      return this.state.currentUser._id === note.user_id
    }.bind(this));
    console.log(notes)
    this.setState({noteList: notes})
  },
  toggleSearch: function(){
    console.log("search toggle clicked")
    this.state.searchOpen ? this.setState({searchOpen: false}) : this.setState({searchOpen: true})
  },
  render: function() {
    return (
      <div className="window">
        <SideBar
          users={this.state.users}
          currentUser={this.state.currentUser}
          noteSelect={this.noteSelect}
          loginUser={this.loginUser}
          logoutUser={this.logoutUser}
          notes={this.state.noteList} />
        <MainWorkSpace
          addNote={this.addNote}
          toggleSearch={this.toggleSearch}
          users={this.state.users}
          notes={this.state.notes}
          saveNote={this.saveNote}
          openFile={this.openFile}
          notePads={this.state.notePads}
        />
        <Search open={this.state.searchOpen}/>
      </div>
    );
  }
});

ReactDom.render(<App/>, document.getElementById('main-container'));
