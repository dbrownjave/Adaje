import * as React from "react";

import FileUploadPage from "./pages/FileUploadPage";

import { Server } from "miragejs";
import { CustomFile } from "./types/CustomFile";

// Mock API Service
new Server({
  routes() {
    this.namespace = "api";

    // File storage upload
    this.post(
      "/files",
      (schema, request) => {
        // use modiles such as express-fileupload, Busyboy, Multer to perfom operations
        return { message: "File uploaded successfully" };
      },
      {
        // delay the response
        timing: 4000,
      }
    );
  },
});

export default function App() {
  return <FileUploadPage />;
}
