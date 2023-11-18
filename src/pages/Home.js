import { useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import galleryList from '../Components/data.json';
import GalleryItem from '../Components/Gallery/GalleryItem';
import { useStateContext } from '../store/Context';

const Home = () => {
  const { setIsOnHomepage } = useStateContext();

  useEffect(() => {
    setIsOnHomepage(true);
  }, [setIsOnHomepage]);

  return (
    <div className="home p-6">
      <ResponsiveMasonry columnsCountBreakPoints={{ 375: 1, 768: 2, 900: 3, 1280: 4 }}>
        <Masonry className="gallery-items !gap-10">
          {galleryList.map((item) => (
            <GalleryItem key={item.id} index={item.id} thumbnail={item.images.thumbnail} name={item.name} artist={item.artist.name} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Home;
