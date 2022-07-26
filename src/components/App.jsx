import { Component } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Grid } from 'react-loader-spinner';

import { Searchbar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGalery/ImageGallery';
import { Button } from 'components/Button/Button';

import css from 'components/App.module.css';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27848247-ce78afbd89c0e4185f88b7a39';
const LIMIT = 12;

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    items: [],
    error: '',
    status: 'idle',
    buttonVisible: false,
  };

  async fetchItems(request, page) {
    const decodeQuery = decodeURIComponent(request.replace(' ', '+'));
    const params = new URLSearchParams({
      per_page: LIMIT,
      page: page,
      key: KEY,
      q: decodeQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    try {
      const url = `${BASE_URL}?${params}`;

      const response = await axios.get(url);
      if (response.data.totalHits !== 0) {
        const items = response.data.hits.map(
          ({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          }
        );
        const shownImages = LIMIT * page;
        if (response.data.total < shownImages) {
          this.setState({ buttonVisible: false });
        } else {
          this.setState({ buttonVisible: true });
        }

        return items;
      } else {
        return Promise.reject(new Error('Bad request'));
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleFormSubmit = value => {
    if (this.state.searchQuery !== value) {
      this.setState({
        searchQuery: value,
        page: 1,
        buttonVisible: false,
        items: [],
      });
    }
  };

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      this.fetchItems(this.state.searchQuery, this.state.page)
        .then(items => {
          const oldItems = this.state.items;
          const newItems = [...oldItems, ...items];
          this.setState({ items: newItems, status: 'resolved' });
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
  }

  render() {
    if (this.state.status === 'idle') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <h1 className={css.Title}>Enter query</h1>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    }
    if (this.state.status === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass={css.Wrapper}
            visible={true}
          />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    }
    if (this.state.status === 'rejected') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <h1 className={css.Title}>{this.state.error}</h1>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    }
    if (this.state.status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery items={this.state.items} />
          {this.state.buttonVisible && (
            <Button onClick={this.handleButtonClick} />
          )}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      );
    }
  }
}
