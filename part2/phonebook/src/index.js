import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import axios from "axios";

axios.get("http://localhost:3001/phoneBook").then((response) => {
  const phoneBook = response.data;
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App phoneBook={phoneBook} />
  );
});
