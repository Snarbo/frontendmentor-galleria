import { useStateContext } from '../../store/Context';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logos/logo.svg';
import StartStopSlideshow from './StartStopSlideshow';

const Header = () => {
  const { setStartSlideshow } = useStateContext();

  const reset = () => {
    setStartSlideshow(false);
  };

  return (
    <header className="header flex justify-between border-b p-6 md:py-7 md:px-10 xl:mx-10 xl:px-0 xl:py-10">
      <Link className="header-logo" to="" onClick={reset}>
        <img className="w-[113px] xl:w-[170px]" src={Logo} alt="Logo" />
      </Link>
      <StartStopSlideshow />
    </header>
  );
};

export default Header;
