var React = require('react');
var Autosuggest = require('react-autosuggest');

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
      suggestions: this.getSuggestions('')
    };
  },
  getSuggestions: function (value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.companies.filter(company => company.name.toLowerCase().slice(0, inputLength) === inputValue);
  },
  onChange: function (event, { newValue }) {
    this.setState({
      value: newValue
    });
  },
  onSuggestionsUpdateRequested: function ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  },
  onSuggestionSelected: function (event, suggestion) {
    if (this.props.searchSelect) {
      this.props.searchSelect(suggestion.suggestion);
    }
    if (this.props.noteSearchSelect) {
      this.props.noteSearchSelect(suggestion.suggestion);
    }
  },
  render: function () {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Company name...',
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