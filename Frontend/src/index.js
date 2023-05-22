import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider} from '@react-oauth/google'
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="588708527535-5d2jeanoj5ljg58q4ms5gt4lok3cvsf1.apps.googleusercontent.com">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>
);
