var React = require('react');
var Autosuggest = require('react-autosuggest');

const languages = [{
  name: 'C',
  year: 1972
}, {
  name: 'Elm',
  year: 2012
}];

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue);
}

function getSuggestionValue(suggestion) {
  // when suggestion is selected, this function tells
  return suggestion.name; // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return React.createElement(
    'span',
    null,
    suggestion.name
  );
}

var SearchField = React.createClass({
  getInitialState: function () {
    return {
      value: '',
      suggestions: getSuggestions('')
    };
  },
  onChange: function (event, { newValue }) {
    this.setState({
      value: newValue
    });
  },
  onSuggestionsUpdateRequested: function ({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  },
  onSuggestionSelected: function () {
    console.log(this.state.suggestions);
  },
  render: function () {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    return React.createElement(Autosuggest, { suggestions: suggestions,
      onSuggestionSelected: this.onSuggestionSelected,
      onSuggestionsUpdateRequested: this.onSuggestionsUpdateRequested,
      getSuggestionValue: getSuggestionValue,
      renderSuggestion: renderSuggestion,
      inputProps: inputProps });
  }
});

module.exports = SearchField;