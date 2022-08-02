import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from 'components/ImageGalery/ImageGallery.module.css';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {items.map(item => (
        <ImageGalleryItem item={item} key={item.id} onClick={onClick} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
