// Import necessary React and React Router libraries
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Import Bootstrap for styling
import 'bootstrap/dist/css/bootstrap.min.css'

// Import the main App component and specific page components
import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

// Define the application's routing configuration
const router = createBrowserRouter([
  {
    // Root path renders the main App component
    path: '/',
    element: <App />,
    // Fallback error element for undefined routes
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    // Nested routes within the App component
    children: [
      {
        // Default route within App renders SearchBooks component
        index: true,
        element: <SearchBooks />
      },
      {
        // '/saved' path renders the SavedBooks component
        path: '/saved',
        element: <SavedBooks />
      }
    ]
  }
])

// Render the application with routing capabilities
ReactDOM.createRoot(document.getElementById('root')).render(
  // Provide the router configuration to the entire application
  <RouterProvider router={router} />
)
