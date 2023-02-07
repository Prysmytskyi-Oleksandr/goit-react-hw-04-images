import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchName } = this.state;
    if (searchName.trim() === '') {
      alert('Введіть запит');
      return;
    }
    this.props.onSubmit(searchName);
    this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <button type="submit" className={styles.button}></button>

          <input
            className={styles.input}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            name="searchName"
            value={searchName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
