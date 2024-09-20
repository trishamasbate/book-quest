import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Main application component
    errorElement: <h1 className='display-2'>Wrong page!</h1>, // Error element for invalid routes
    children: [
      {
        index: true, // Default route
        element: <SearchBooks /> // Component to render for the default route
      }, 
      {
        path: '/saved', // Route for saved books
        element: <SavedBooks /> // Component to render for the saved books route
      }
    ]
  }
]);

// Render the application and provide the router configuration
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);