import { useStateContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const StartStopSlideshow = () => {
  const { isOnHomepage, startSlideshow, setStartSlideshow } = useStateContext();
  const navigate = useNavigate();

  const toggleSlideshow = () => {
    setStartSlideshow(!startSlideshow);

    if (isOnHomepage) navigate('/detail/0');
  };

  return (
    <button className="start-stop text-[9px] font-bold tracking-[2px] uppercase transition md:text-xs md:tracking-[2.5px]" onClick={toggleSlideshow}>
      {startSlideshow === false ? 'Start' : 'Stop'} slideshow
    </button>
  );
};

export default StartStopSlideshow;
