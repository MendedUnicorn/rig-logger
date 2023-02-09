import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Base from '../components/Root';
import AddNewTripPage from '../components/AddNewTripPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    errorElement: <p>error</p>,
    children: [
      {
        path: 'test',
        element: <p>test</p>,
      },
      {
        path: 'create',
        element: <AddNewTripPage />,
      },
    ],
  },
]);

const Provider = () => {
  return <RouterProvider router={router} />;
};

export default Provider;
