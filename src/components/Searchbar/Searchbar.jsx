import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      alert('Введіть запит');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.button}></button>

        <input
          className={styles.input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          name="searchName"
          value={searchName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     searchName: '',
//   };

//   handleNameChange = event => {
//     this.setState({ searchName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { searchName } = this.state;
//     if (searchName.trim() === '') {
//       alert('Введіть запит');
//       return;
//     }
//     this.props.onSubmit(searchName);
//     this.setState({ searchName: '' });
//   };

//   render() {
//     const { searchName } = this.state;
//     return (
//       <header className={styles.searchbar}>
//         <form onSubmit={this.handleSubmit} className={styles.form}>
//           <button type="submit" className={styles.button}></button>

//           <input
//             className={styles.input}
//             type="text"
//             autocomplete="off"
//             autofocus
//             placeholder="Search images and photos"
//             name="searchName"
//             value={searchName}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
