import { Component } from 'react';
import { Audio } from 'react-loader-spinner';

import { searchImages } from 'servise/API';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    loading: false,
    page: 1,
    lastPage: 1,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  hendleFormSubmit = searchName => {
    this.setState({ searchName, images: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page)
      this.searchImages();
  }

  async searchImages() {
    try {
      this.setState({ loading: true });
      const { searchName, page } = this.state;
      const data = await searchImages(searchName, page);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        lastPage: data.totalHits / 12,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onClickImage = url => {
    this.setState({ largeImageURL: url, showModal: true });
  };

  onCloseModal = () => {
    this.setState({ largeImageURL: '', showModal: false });
  };

  render() {
    const { images, error, loading, showModal, largeImageURL, page, lastPage } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.hendleFormSubmit} />

        <ImageGallery images={images} onClickImg={this.onClickImage} />

        {error && <p>{error}</p>}

        {images.length > 0 && !loading && page < lastPage && (
          <Button loadMore={this.loadMore} />
        )}

        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle=""
            wrapperClass=""
          />
        )}

        {showModal && (
          <Modal close={this.onCloseModal}>
            <img src={largeImageURL} width="800px" alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
