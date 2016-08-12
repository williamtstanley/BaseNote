var React = require('react');
var ReactDom = require('react-dom');
var Electron = require('electron');
var MainWorkSpace = require('./main_workspace');
var SideBar = require('./sidebar');
var NotePad = require('./notepad');
var NoteDisplay = require('./note_display');
var SearchSideBar = require('./search_side_bar');

var fs = require("fs");

var config = require("../js/config.json");

const shell = require('electron').shell;
const os = require('os');
const apiUrl = "http://localhost:3000/api/"; // + "notes" + "users" + "Companies"

Electron.ipcRenderer.on('ping', (event, message) => {
  console.log(message);
});

var App = React.createClass({
  getInitialState: function () {
    return {
      currentUser: config.user,
      selectedCompany: {},
      users: [],
      noteList: [],
      masterNoteList: [],
      companies: [],
      notes: [],
      notePadCount: 0,
      notePads: [],
      searchOpen: false,
      companyNotes: [],
      userCompletedNotes: [],
      companyCompletedNotes: []
    };
  },
  componentDidMount: function () {
    this.getNotes();
    this.getUsers();
    this.getCompanies();
  },
  getUsers: function () {
    var that = this;
    var req = new Request(apiUrl + "users", { method: 'GET', cache: 'reload' });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      that.setState({ users: json.users });
    });
  },
  getNotes: function (callback) {
    var that = this;
    var req = new Request(apiUrl + "notes", { method: 'GET', cache: 'reload' });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      var tempNoteList = json.notes;
      that.setState({ masterNoteList: tempNoteList }, that.filterNotes(tempNoteList));
    });
  },
  getCompanies: function () {
    var that = this;
    var req = new Request(apiUrl + "companies", { method: 'GET', cache: 'reload' });
    fetch(req).then(function (response) {
      return response.json();
    }).then(function (json) {
      that.setState({ companies: json.companies });
    });
  },
  saveNote: function (data) {
    var that = this;
    var noteList = this.state.noteList;
    var masterNoteList = this.state.masterNoteList;
    data["user_id"] = this.state.currentUser._id;
    note = JSON.stringify(data);
    fetch(apiUrl + "notes", {
      method: 'post',
      headers: {
        "content-type": "application/json"
      },
      body: note
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      masterNoteList.push(data.note);
      noteList.push(data.note);
      that.setState({
        noteList: noteList,
        masterNoteList: masterNoteList
      });
    }).catch(function (error) {
      console.log('Request failed', error);
    });
  },
  noteSelect: function (id) {
    console.log("note selected: " + id);
    var notes = this.state.notes;
    var tempNote = this.state.masterNoteList.filter(function (note) {
      return id === note._id;
    });
    var company = this.state.companies.filter(function (company) {
      return tempNote[0].company_id === company._id;
    });
    var note = React.createElement(NoteDisplay, {
      key: tempNote[0]._id,
      note: tempNote[0],
      company: company[0] || { name: "undefined" },
      completeNote: this.completeNote,
      closeNoteDisplay: this.closeNoteDisplay
    });
    this.setState({
      notes: [note],
      notePads: []
    });
  },
  closeNoteDisplay: function () {
    this.setState({ notes: [] });
  },
  renderNotePad: function (text = "") {
    var notePad = React.createElement(NotePad, {
      text: text,
      companies: this.state.companies,
      key: this.state.notePadCount,
      dataId: this.state.notePadCount,
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      renderNote: this.renderNote
    });
    var notePads = this.state.notePads;
    notePads.push(notePad);
    this.setState({
      notes: [],
      notePads: notePads,
      notePadCount: this.state.notePadCount += 1
    });
  },
  addNote: function () {
    this.renderNotePad();
  },
  removeNote: function (id) {
    notePads = this.state.notePads.filter(function (element) {
      return id !== element.props.dataId;
    });
    this.setState({
      notePads: notePads
    });
  },
  loginUser: function (user) {
    console.log("Login and set user in config: " + user.firstName);
    var config = {
      user: user
    };
    fs.writeFile("./app/js/config.json", JSON.stringify(config), "utf8", function () {
      this.setState({ currentUser: user }, function () {
        this.filterNotes(this.state.masterNoteList);
      }.bind(this));
    }.bind(this));
  },
  logoutUser: function () {
    console.log("Logout User and remove from config");
    config = {
      user: { firstName: "Please", lastName: "Login" }
    };
    this.setState({ currentUser: config.user });
    fs.writeFile("./app/js/config.json", JSON.stringify(config), "utf8");
  },
  filterNotes: function (noteList) {
    var notes = noteList.filter(function (note) {
      return this.state.currentUser._id === note.user_id && !note.completed;
    }.bind(this));
    this.setState({ noteList: notes });
  },
  toggleSearch: function () {
    this.state.searchOpen ? this.setState({ searchOpen: false }) : this.setState({ searchOpen: true });
  },
  searchSelect: function (company) {
    var companyNotes = this.state.masterNoteList.filter(function (note) {
      return note.company_id === company._id && !note.completed;
    });
    this.setState({ companyNotes: companyNotes, selectedCompany: company }, function () {
      console.log(this.state.selectedCompany);
    }.bind(this));
  },
  filterUserCompletedNotes: function () {
    var userCompletedNotes = this.state.masterNoteList.filter(function (note) {
      return note.completed && note.user_id === this.state.currentUser._id;
    }.bind(this));
    this.setState({ userCompletedNotes: userCompletedNotes });
  },
  filterCompanyCompletedNotes: function () {
    var companyCompletedNotes = this.state.masterNoteList.filter(function (note) {
      return note.completed && note.company_id === this.state.selectedCompany._id;
    }.bind(this));
    this.setState({ companyCompletedNotes: companyCompletedNotes });
  },
  completeNote: function (noteId) {
    var that = this;
    var update = { completed: true };
    var data = JSON.stringify(update);
    fetch(apiUrl + "notes/" + noteId, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json"
      },
      body: data
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data.note);
      that.updateNoteList(data.note);
    }).catch(function (error) {
      console.log('Request failed', error);
    });
  },
  updateNoteList: function (updateNote) {
    var tempNoteList = this.state.masterNoteList.filter(function (note) {
      return note._id != updateNote._id;
    }.bind(this));
    tempNoteList.push(updateNote);
    this.setState({ masterNoteList: tempNoteList }, this.filterNotes(tempNoteList));
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'window' },
      React.createElement(SideBar, {
        users: this.state.users,
        currentUser: this.state.currentUser,
        noteSelect: this.noteSelect,
        loginUser: this.loginUser,
        logoutUser: this.logoutUser,
        notes: this.state.noteList,
        userCompletedNotes: this.state.userCompletedNotes,
        filterUserCompletedNotes: this.filterUserCompletedNotes
      }),
      React.createElement(MainWorkSpace, {
        addNote: this.addNote,
        toggleSearch: this.toggleSearch,
        users: this.state.users,
        notes: this.state.notes,
        saveNote: this.saveNote,
        openFile: this.openFile,
        notePads: this.state.notePads
      }),
      React.createElement(SearchSideBar, {
        companyNotes: this.state.companyNotes,
        companyCompletedNotes: this.state.companyCompletedNotes,
        filterCompanyCompletedNotes: this.filterCompanyCompletedNotes,
        companies: this.state.companies,
        noteSelect: this.noteSelect,
        open: this.state.searchOpen,
        searchSelect: this.searchSelect
      })
    );
  }
});

ReactDom.render(React.createElement(App, null), document.getElementById('main-container'));