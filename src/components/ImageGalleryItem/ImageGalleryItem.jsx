import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item }) => {
  const { webformatURL, largeImageURL } = item;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt="img"
        className={css.ImageGalleryItem_image}
        data-url={largeImageURL}
      />
    </li>
  );
};
