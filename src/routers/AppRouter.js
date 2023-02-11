import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Base from '../components/Root';
import AddNewTripPage from '../components/AddNewTripPage';
import OverviewPage from '../components/OverviewPage';
import TripsPage from '../components/TripsPage';
import EditTripPage from '../components/EditTripPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Base />,
    errorElement: <p>error</p>,
    children: [
      {
        path: 'overview',
        element: <OverviewPage />,
      },
      {
        path: 'create',
        element: <AddNewTripPage />,
      },
      {
        path: 'trips',
        element: <TripsPage />,
      },
      {
        path: 'trip/:id/edit',
        element: <EditTripPage />,
      },
    ],
  },
]);

const Provider = () => {
  return <RouterProvider router={router} />;
};

export default Provider;
