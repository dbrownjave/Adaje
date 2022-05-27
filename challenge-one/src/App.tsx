import * as React from "react";

import { Server } from "miragejs";
import RandomNumberPage from "./pages/RandomNumberPage";

// Mock API Service
new Server({
  routes() {
    this.namespace = "api";

    // returns random number between 1 and 900.
    this.get("/numbers", () => ({
      number: Math.floor(Math.random() * 900 + 1),
    }));
  },
});

export default function App() {
  return <RandomNumberPage />;
}
