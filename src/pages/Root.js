import { Outlet } from 'react-router-dom';

import Header from '../Components/Master/Header';

const Root = () => {
  return (
    <div className="galleria relative">
      <div className="container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
