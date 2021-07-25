import { useState } from 'react';
import styles from './Searchbar.module.scss';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const addSearchReq = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'search':
        setSearch(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={addSearchReq}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
