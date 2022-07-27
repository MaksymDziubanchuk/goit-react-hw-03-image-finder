import { ThreeDots } from 'react-loader-spinner';
import css from 'components/Loader/Loader.module.css';

export const Loader = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ display: 'block' }}
      wrapperClassName={css.Wrapper}
      visible={true}
    />
  );
};
