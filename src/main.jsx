import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
//
import { HelmetProvider } from "react-helmet-async";
// Script Library
// Set up axios base url

import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import { UserRoleProvider } from "./context/AuthContext"; // Import UserRoleProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Suspense>
          <AuthProvider>
            <UserRoleProvider>
              <App />
            </UserRoleProvider>
          </AuthProvider>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </HelmetProvider>
);
