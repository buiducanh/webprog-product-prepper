import React from 'react';
import PeopleProfile from './peopleprofile';

export default class SearchQuery extends React.Component {
  getSearchTerm() {
    // If there's no query input to this page (e.g. /foo instead of /foo?bar=4),
    // query may be undefined. We have to check for this, otherwise
    // JavaScript will throw an exception and die!
    var queryVars = this.props.location.query;
    var searchTerm = "";
    if (queryVars && queryVars.searchTerm) {
      searchTerm = queryVars.searchTerm;
      // Remove extraneous whitespace.
      searchTerm.trim();
    }
    return searchTerm;
  }
  
  render() {
    var searchTerm = this.getSearchTerm();
    // By using the searchTerm as the key, React will create a new
    // peopleprofile component every time the search term changes.
    return (
      <PeopleProfile key={searchTerm} searchTerm={searchTerm} />
    );
  }
}
