import React, { Component } from 'react';

const SearchStyles = {
  margin: '20px auto'
};

class Search extends Component {
  handleChange = e => {
    this.props.handleTextChange(e.target.value);
  };

  render() {
    return (
      <input
        className='inputStyle'
        style={SearchStyles}
        type='text'
        placeholder='Search tasks'
        onChange={this.handleChange}
      />
    );
  }
}

export default Search;
