import { useState, createContext, useContext } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isOnHomepage, setIsOnHomepage] = useState(true);
  const [startSlideshow, setStartSlideshow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (modalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <StateContext.Provider
      value={{
        isOnHomepage,
        setIsOnHomepage,
        startSlideshow,
        setStartSlideshow,
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
