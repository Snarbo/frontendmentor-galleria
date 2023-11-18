import { Link } from 'react-router-dom';

const GalleryItem = ({ index, thumbnail, name, artist }) => {
  return (
    <Link className="gallery-item block relative" to={`/detail/${index}`}>
      <div className="gallery-item-back">
        <img className="w-full" src={thumbnail} alt={name} />
      </div>
      <div className="gallery-item-front absolute right-0 bottom-0 left-0 flex flex-col justify-end px-8 pb-8 h-[170px] bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.8))]">
        <h2 className="gallery-item-name text-2xl font-bold text-white">{name}</h2>
        <p className="gallery-item-artist mt-2 text-[13px] text-white">{artist}</p>
      </div>
    </Link>
  );
};

export default GalleryItem;
