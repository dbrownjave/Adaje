import { ReactNode } from "react";
import { DropzoneOptions } from "react-dropzone";
import { CustomFile } from "../../types/CustomFile";

export interface UploadFileProps extends DropzoneOptions {
  onUpload?: (file: CustomFile) => void;
}
