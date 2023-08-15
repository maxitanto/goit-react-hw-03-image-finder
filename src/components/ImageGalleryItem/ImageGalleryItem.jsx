import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, selectedImg }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItemImg}
        src={src}
        alt={alt}
        onClick={selectedImg}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  selectedImg: PropTypes.func.isRequired,
};
