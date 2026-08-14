import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx"; 
import FeaturedProjects from "./pages/FeaturedProjects.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contributions from "./pages/Contributions.jsx";
import Contacts from "./pages/Contacts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App, 
    children: [
      {
        index: true, 
        Component: Home, 
      },
      {
        path: "featured-projects", 
        Component: FeaturedProjects, 
      },
      {
        path: "services", 
        Component: Services, 
      },
      {
        path: "about", 
        Component: About, 
      },
      {
        path: "contributions", 
        Component: Contributions, 
      },
      {
        path: "contacts", 
        Component: Contacts, 
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);