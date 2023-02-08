import PropTypes from 'prop-types';

import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ webImg, largeImg, onClickImg }) => {
  return (
    <li
      onClick={() => {
        onClickImg(largeImg);
      }}
      className={styles.imgGallery}
    >
      <img src={webImg} alt="" className={styles.img} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};
