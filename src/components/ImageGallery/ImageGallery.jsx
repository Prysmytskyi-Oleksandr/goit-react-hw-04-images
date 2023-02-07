import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './imageGallery.module.css';

const ImageGallery = ({ images, onClickImg }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webImg={webformatURL}
            largeImg={largeImageURL}
            onClickImg={onClickImg}
          />
        );
      })}
    </ul>
  );
};
export default ImageGallery;

ImageGallery.defaultProps = {
  images: [],
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClickImg: PropTypes.func.isRequired,
};
