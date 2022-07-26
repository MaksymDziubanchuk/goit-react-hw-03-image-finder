import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/SearchBar/SearchBar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    const value = e.target.value;

    this.setState({ inputValue: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const query = this.state.inputValue.trim();

    if (query === '') {
      toast.error('Query can not be empty!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
      });
      return;
    }

    this.props.onSubmit(query.toLowerCase());
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
