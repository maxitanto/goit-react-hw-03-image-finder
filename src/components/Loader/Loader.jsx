import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#3f51b5"
      wrapperStyle={{}}
      wrapperClass={css.loader}
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#182363"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
