import { useState, useEffect, useCallback } from 'react';
import { useStateContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const GalleryControls = ({ currentIndex, maxItems, name, artist }) => {
  const initialProgressValue = 100 / maxItems;
  const currentDetailNumber = currentIndex + 1;
  const currentProgressValue = currentDetailNumber * initialProgressValue;
  const nextProgressValue = (currentDetailNumber + 1) * initialProgressValue;

  const [progressValue, setProgressValue] = useState(initialProgressValue);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const { startSlideshow } = useStateContext();
  const navigate = useNavigate();

  const prevHandler = () => {
    setNextDisabled(false);
    navigate(`/detail/${currentIndex - 1}`);
  };

  const nextHandler = useCallback(() => {
    setPrevDisabled(false);
    navigate(`/detail/${currentIndex + 1}`);
  }, [currentIndex, navigate]);

  useEffect(() => {
    const animateProgress = (currentProgressValue, nextProgressValue) => {
      const step = (nextProgressValue - currentProgressValue) / 300;
      let progressValue = currentProgressValue;

      function animate() {
        if (progressValue < nextProgressValue) {
          progressValue += step;
          setProgressValue(progressValue);
          requestAnimationFrame(animate);
        } else {
          progressValue = nextProgressValue;
          setProgressValue(progressValue);

          if (currentDetailNumber !== maxItems) {
            nextHandler();
            setPrevDisabled(false);
            setNextDisabled(false);
          }
        }
      }

      animate();
    };

    if (currentIndex === 0) setPrevDisabled(true);
    if (currentDetailNumber === maxItems) setNextDisabled(true);
    if (startSlideshow === false) setProgressValue(currentProgressValue);
    if (startSlideshow === true) {
      animateProgress(currentProgressValue, nextProgressValue);
      setPrevDisabled(true);
      setNextDisabled(true);
    }
  }, [currentProgressValue, currentIndex, currentDetailNumber, maxItems, nextProgressValue, nextHandler, startSlideshow]);

  return (
    <div className="pagination fixed right-0 bottom-0 left-0 bg-white z-10">
      <progress className="pagination-progress block w-full h-[1px]" value={progressValue} max="100"></progress>
      <div className="flex justify-between flex items-center py-4 px-6 md:py-[25px] md:px-10">
        <div className="pagination-content">
          <p className="text-sm font-bold text-black md:text-lg">{name}</p>
          <small className="block mt-2 text-[13px] font-normal">{artist}</small>
        </div>
        <div className="pagination-controls">
          <button className="prev mr-6 md:mr-10" disabled={prevDisabled} onClick={prevHandler}>
            <svg className="w-4 h-4 md:w-[25px] md:h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 24" fill="none">
              <path d="M24.1655 1.8435L3.62701 12.1128L24.1655 22.382V1.8435Z" stroke={prevDisabled ? '#D8D8D8' : '#000'} strokeWidth="2" />
              <rect
                x="-0.371478"
                y="0.371478"
                width="0.742956"
                height="23.0316"
                transform="matrix(-1 0 0 1 0.742884 0)"
                fill={prevDisabled ? '#D8D8D8' : '#000'}
                stroke={prevDisabled ? '#D8D8D8' : '#000'}
                strokeWidth="0.742956"
              />
            </svg>
          </button>
          <button className="next" disabled={nextDisabled} onClick={nextHandler}>
            <svg className="w-4 h-4 md:w-[25px] md:h-[25px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 24" fill="none">
              <path d="M1.52783 1.8435L22.0663 12.1128L1.52783 22.382V1.8435Z" stroke={nextDisabled ? '#D8D8D8' : '#000'} strokeWidth="2" />
              <rect x="24.579" y="0.371478" width="0.742956" height="23.0316" fill={nextDisabled ? '#D8D8D8' : '#000'} stroke={nextDisabled ? '#D8D8D8' : '#000'} strokeWidth="0.742956" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryControls;
