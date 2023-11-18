import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './pages/Root';
import Home from './pages/Home';
import Detail from './pages/Detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/detail/:id', element: <Detail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
