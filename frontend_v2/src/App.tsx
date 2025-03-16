import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import AuthenticatedRoute from './pages/control/AuthenticatedRoute';
import FilteredTableView from './pages/data/FilteredTableView';
import TableView from './pages/data/TableView';
import LoginPage from './pages/control/LoginPage';

import NotFoundPage from './pages/NotFoundPage';

import 'foundation-sites/dist/css/foundation.min.css';
const App: React.FC = () => {
  const router = createBrowserRouter(
    [
      {
        element: <AuthenticatedRoute />,
        children: [
          {
            path: "/authenticated-route",
              element: <Home />,
          },
          {
            path: "/authenticated-route/view_table",
              element: <TableView />,
          },
          {
            path: "/authenticated-route/filter_table",
              element: <FilteredTableView/>,
          }
	      ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />
      },
    ], 

  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
