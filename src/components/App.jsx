import { Component } from 'react';
import axios from 'axios';
import css from 'components/App.module.css';
import { Searchbar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGalery/ImageGallery';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27848247-ce78afbd89c0e4185f88b7a39';
const LIMIT = 12;

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    items: [],
  };

  async fetchItems(request) {
    const params = new URLSearchParams({
      per_page: LIMIT,
      page: this.state.page,
      key: KEY,
      q: this.state.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    try {
      const url = `${BASE_URL}?${params}`;

      const response = await axios.get(url);

      const items = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        }
      );
      return items;
    } catch (error) {
      console.log(error);
    }
  }
  handleFormSubmit = value => {
    this.setState({ searchQuery: value });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery &&
      this.state.searchQuery !== ''
    ) {
      this.fetchItems(this.state.searchQuery)
        .then(items => this.setState({ items }))
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery items={this.state.items} />
      </section>
    );
  }
}
