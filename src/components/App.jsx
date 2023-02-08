import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

import { searchImages } from 'servise/API';

import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const hendleFormSubmit = searchName => {
    setSearchName(searchName);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (searchName) {
      const onsearchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(searchName, page);
          setImages(prevImages => [...prevImages, ...data.hits]);
          setLastPage(data.totalHits / 12);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      onsearchImages();
    }
  }, [searchName, page, setLoading, setImages, setError]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onClickImage = url => {
    setLargeImageURL(url);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <div>
      <Searchbar onSubmit={hendleFormSubmit} />

      <ImageGallery images={images} onClickImg={onClickImage} />

      {error && <p>{error}</p>}

      {images.length > 0 && !loading && page < lastPage && (
        <Button loadMore={loadMore} />
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
        <Modal close={onCloseModal}>
          <img src={largeImageURL} width="800px" alt="" />
        </Modal>
      )}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     searchName: '',
//     images: [],
//     loading: false,
//     page: 1,
//     lastPage: 1,
//     error: null,
//     showModal: false,
//     largeImageURL: '',
//   };

//   hendleFormSubmit = searchName => {
//     this.setState({ searchName, images: [], page: 1 });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchName, page } = this.state;
//     if (prevState.searchName !== searchName || prevState.page !== page)
//       this.searchImages();
//   }

//   async searchImages() {
//     try {
//       this.setState({ loading: true });
//       const { searchName, page } = this.state;
//       const data = await searchImages(searchName, page);
//       this.setState(({ images }) => ({
//         images: [...images, ...data.hits],
//         lastPage: data.totalHits / 12,
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   onClickImage = url => {
//     this.setState({ largeImageURL: url, showModal: true });
//   };

//   onCloseModal = () => {
//     this.setState({ largeImageURL: '', showModal: false });
//   };

//   render() {
//     const { images, error, loading, showModal, largeImageURL, page, lastPage } =
//       this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.hendleFormSubmit} />

//         <ImageGallery images={images} onClickImg={this.onClickImage} />

//         {error && <p>{error}</p>}

//         {images.length > 0 && !loading && page < lastPage && (
//           <Button loadMore={this.loadMore} />
//         )}

//         {loading && (
//           <Audio
//             height="80"
//             width="80"
//             radius="9"
//             color="green"
//             ariaLabel="loading"
//             wrapperStyle=""
//             wrapperClass=""
//           />
//         )}

//         {showModal && (
//           <Modal close={this.onCloseModal}>
//             <img src={largeImageURL} width="800px" alt="" />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
