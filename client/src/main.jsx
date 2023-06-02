import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "@/common/routes/index.jsx";

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children: Object.keys(routes).map(key => routes[key]).flat(Infinity).map(route => ({
        index: route.path === '/',
        path: route.path === '/' ? undefined : route.path,
        element: route.component
    })),
    errorElement: <App />
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);