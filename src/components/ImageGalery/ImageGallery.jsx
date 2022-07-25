import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from 'components/ImageGalery/ImageGallery.module.css';

export const ImageGallery = ({ items }) => {
  return (
    <ul className={css.ImageGallery}>
      {items.map(item => (
        <ImageGalleryItem item={item} key={item.id} />
      ))}
    </ul>
  );
};
