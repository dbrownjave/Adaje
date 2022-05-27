import { ReactNode } from "react";

export interface CustomFile extends File {
  path?: string;
  lastModifiedDate?: Date;
}
