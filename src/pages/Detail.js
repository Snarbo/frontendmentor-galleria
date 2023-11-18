import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStateContext } from '../store/Context';

import galleryList from '../Components/data.json';
import ExpandIcon from '../assets/icons/icon-expand.svg';
import Modal from '../Components/Modal';
import GalleryControls from '../Components/Gallery/GalleryControls';

const Detail = () => {
  //before load
  const params = useParams();
  const id = parseInt(params.id);
  const galleryItem = galleryList.find((obj) => obj.id === id);
  const maxGalleryItems = galleryList.length;
  const navigate = useNavigate();
  const { setIsOnHomepage, modalOpen, setModalOpen } = useStateContext();

  useEffect(() => {
    if (galleryItem === undefined) navigate('/');
    setIsOnHomepage(false);
  }, [galleryItem, navigate, setIsOnHomepage]);

  //after load
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let galleryItemName = 'small'; //default size
  if (galleryItem.name.length > 16) galleryItemName = 'large';

  const modalOpenHandler = () => setModalOpen(true);

  return (
    <>
      {modalOpen && <Modal galleryImage={galleryItem.images.gallery} galleryImageName={galleryItem.name} />}
      <div className="detail p-6 pb-[145px] md:p-10 md:pb-[160px] xl:flex xl:justify-between xl:pt-[100px] xl:pb-[245px]">
        <div className={`detail-hero relative ${galleryItemName === 'small' ? 'pt-[230px]' : 'pt-[200px]'} md:p-0`}>
          <button
            className="detail-hero-view absolute top-4 left-4 flex items-center py-3.5 px-4 text-[10px] font-bold tracking-[2px] uppercase bg-black/75 text-white transition hover:bg-black md:top-auto md:bottom-4"
            onClick={modalOpenHandler}
          >
            <img className="mr-3.5" src={ExpandIcon} alt="Expand" /> View Image
          </button>
          <div className="detail-hero-image absolute top-0 right-0 left-0 z-[-1] md:static xl:relative">
            <img className="h-[280px] md:w-[475px] md:h-auto" src={isMobile ? galleryItem.images.hero.small : galleryItem.images.hero.large} alt={galleryItem.name} />
            <img className="detail-hero-artistimg absolute w-32 h-32 hidden xl:block" src={galleryItem.artist.image} alt={galleryItem.name} />
          </div>
          <div className="detail-hero-content p-6 w-[280px] bg-white z-10 md:absolute md:top-0 md:right-0 md:pt-0 md:pr-0 md:pb-[67px] md:pl-[65px] md:w-[445px] xl:right-auto">
            <h2 className="detail-hero-name text-2xl font-bold break-words md:text-[56px] md:leading-[64px]">{galleryItem.name}</h2>
            <p className="detail-hero-artist mt-2 text-[15px] md:mt-6">{galleryItem.artist.name}</p>
            <img
              className="detail-hero-artistimg absolute top-full left-4 w-16 h-16 object-cover md:right-[55px] md:left-auto md:w-32 md:h-32 xl:hidden"
              src={galleryItem.artist.image}
              alt={galleryItem.name}
            />
          </div>
        </div>
        <div className="detail-description relative mt-11 pt-[75px] md:mt-16 md:px-[115px] xl:flex-1 xl:mt-0 xl:pt-[115px] xl:pl-0 xl:pr-[125px] xl:max-w-[465px]">
          <h1 className="detail-description-year absolute top-0 right-0 text-[100px] font-bold leading-[100px] z-[-1] md:right-auto md:left-0 md:text-[200px] md:leading-[150px] xl:left-auto xl:right-0">
            {galleryItem.year}
          </h1>
          <p className="detail-description-content text-sm font-bold leading-7">{galleryItem.description}</p>
          <a className="detail-description-source block mt-10 text-[9px] font-bold uppercase underline" href={galleryItem.source}>
            Go to source
          </a>
        </div>
      </div>
      <GalleryControls currentIndex={id} maxItems={maxGalleryItems} name={galleryItem.name} artist={galleryItem.artist.name} />
    </>
  );
};

export default Detail;
