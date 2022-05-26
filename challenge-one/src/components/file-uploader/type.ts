import { ReactNode } from "react";
import { DropzoneOptions } from "react-dropzone";

export interface UploadFileProps extends DropzoneOptions {
  files: (File | string)[];
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
}
