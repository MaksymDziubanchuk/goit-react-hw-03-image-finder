import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchItems } from 'helpers/helpers';
import { Searchbar } from 'components/SearchBar/SearchBar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGalery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

import css from 'components/App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    items: [],
    error: '',
    status: 'idle',
    buttonVisible: false,
    showModal: false,
    modalUrl: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      fetchItems(this.state.searchQuery, this.state.page)
        .then(({ items, buttonVisible }) => {
          const oldItems = this.state.items;
          const newItems = [...oldItems, ...items];
          this.setState({ items: newItems, status: 'resolved', buttonVisible });
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
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

  handleModalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleGalleryClick = e => {
    if (e.target.tagName === 'IMG') {
      this.setState({
        modalUrl: e.target.dataset.url,
        showModal: true,
      });
    }
  };

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
          <Loader />
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
          <ImageGallery
            items={this.state.items}
            onClick={this.handleGalleryClick}
          />
          {this.state.buttonVisible && (
            <Button onClick={this.handleButtonClick} />
          )}
          {this.state.showModal && (
            <Modal onClose={this.handleModalToggle} url={this.state.modalUrl} />
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
