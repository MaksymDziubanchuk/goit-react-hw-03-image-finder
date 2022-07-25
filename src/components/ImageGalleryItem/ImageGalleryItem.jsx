import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ item }) => {
  const baseSrc = item.webformatURL;
  return (
    <li className={css.ImageGalleryItem}>
      <img src={baseSrc} alt="img" className={css.ImageGalleryItem_image} />
    </li>
  );
};
