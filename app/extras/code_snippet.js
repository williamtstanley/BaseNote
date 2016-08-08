  handleResize: function(){
    this.setState({windowHeight: window.innerHeight});
  },
  componentDidMount: function(){
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function(){
    window.removeEventListener('resize', this.handleResize);
  },

  //state

  { windowHeight: window.innerHeight}


 //code for open file dialog
 //Allows access to the open file window opens selected file in the default application
  openFile: function(){
    shell.showItemInFolder(os.homedir());
  },
  
  //Dangerously set raw html strings into displayable html content
  // <div style={tooltipStyle} dangerouslySetInnerHTML={this.renderHtmlString(this.props.note.body)} />
  renderHtmlString: function(htmlString){
    return {__html: htmlString};
  },
