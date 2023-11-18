import { useStateContext } from '../store/Context';

const Modal = ({ galleryImage, galleryImageName }) => {
  const { setModalOpen } = useStateContext();

  const modalCloseHandler = () => setModalOpen(false);

  return (
    <div className="modal fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center z-20">
      <div className="modal-bg absolute top-0 right-0 bottom-0 left-0 bg-black/80"></div>
      <div className="modal-content relative flex flex-col items-center px-6 z-10">
        <button className="ml-auto text-sm font-bold tracking-[3px] uppercase text-white" onClick={modalCloseHandler}>
          Close
        </button>
        <img className="mt-[38px] max-h-[80vh]" src={galleryImage} alt={galleryImageName} />
      </div>
    </div>
  );
};

export default Modal;
