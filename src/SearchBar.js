import React from 'react';

class SearchBar extends React.Component {
  state = { zipCode: '' }

  onSearchSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.zipCode);
  }

  render () {
    return (
      <div style={{ textAlign: 'center' }}>
        <form onSubmit={this.onSearchSubmit}>
          <label style={{ display: 'block' }}>Enter Zip Code</label>
          <input type="text"
                 value={this.state.zipCode}
                 onChange={(e) => this.setState({ zipCode: e.target.value })} />
        </form>
      </div>
    );
  }
}

export default SearchBar;