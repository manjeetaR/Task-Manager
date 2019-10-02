import React, { Component } from 'react';

const SearchStyles = {
  margin: '20px auto'
};

class Search extends Component {
  render() {
    return (
      <input
        className='inputStyle'
        style={SearchStyles}
        type='text'
        placeholder='Search tasks'
      />
    );
  }
}

export default Search;
