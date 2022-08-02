import PropTypes from 'prop-types';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item, onClick }) => {
  const { webformatURL, largeImageURL } = item;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt="img"
        className={css.ImageGalleryItem_image}
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
