import * as React from "react";
import { useState, useEffect } from "react";
//iconify
import { Icon, InlineIcon } from "@iconify/react";

// type
import { UploadFileProps } from "./type";

import { useDropzone } from "react-dropzone";

// @mui
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { Box, Stack, Button, Typography } from "@mui/material";
import { CustomFile } from "../../types/CustomFile";
var bytes = require("bytes");
// Style Components

const DropZoneStyle = styled("div")(({ theme }) => ({
  height: "260px",
  outline: "none",
  padding: theme.spacing(5, 1),
  borderRadius: 8,
  backgroundColor: "transparent",
  border: `2px dashed ${theme.palette.divider}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

const ErrorMessageStyle = styled("div")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  backgroundColor: ` ${red[50]}`,
  color: ` ${red[800]}`,
  borderRadius: 8,
}));

// ----------------------------------------------------------------------

// file size in
const MAX_FILE_SIZE: number = 10;

export default function FileUploader({ onUpload, ...other }: UploadFileProps) {
  // Props
  const { getRootProps, getInputProps, isDragActive, isDragReject, open } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
      maxSize: bytes.parse(`${MAX_FILE_SIZE}MB`),
      onDrop(acceptedFiles, fileRejections, _) {
        setError(false);

        // check for errors
        if (fileRejections.length > 0) setError(true);

        // check the type of errors that occurred
        fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            switch (err.code) {
              case "file-too-large":
                break;
              case "file-invalid-type":
                break;
            }
          });
        });

        // publish accepted file
        const acceptedFile: CustomFile = acceptedFiles[0];
        if (acceptedFile && onUpload) onUpload(acceptedFile);
      },
      // Disable click and keydown behavior
      noClick: true,
      noKeyboard: true,
      ...other,
    });

  // States
  const [error, setError] = useState<boolean>(false);

  // Effects
  useEffect(() => {}, [error]);

  // View
  return (
    <Stack sx={{}} spacing={2}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...(isDragReject && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <Stack>
          <input {...getInputProps()} />
          <Stack alignItems='center' spacing={2}>
            {isDragActive ? (
              isDragReject ? (
                <Typography>
                  The file must be of type PDF
                  {MAX_FILE_SIZE}
                  MB
                </Typography>
              ) : (
                <Typography>Drop the files here ...</Typography>
              )
            ) : (
              <Stack spacing={4} alignItems='center'>
                <Stack alignItems='center' spacing={1}>
                  <Icon
                    icon='charm:upload'
                    width='50'
                    height='50'
                    style={{ opacity: "25%" }}
                  />
                  <Typography>Drag and drop a pdf file here </Typography>
                </Stack>
                <Stack spacing={1}>
                  <Button variant='contained' onClick={open}>
                    Browse Files
                  </Button>
                  <Typography variant='caption' color='text.secondary'>
                    Max File Size: {MAX_FILE_SIZE}MB
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </DropZoneStyle>
      {error && (
        <ErrorMessageStyle>
          <Typography variant='caption'>
            The file must be of type PDF and no larger than {MAX_FILE_SIZE}MB
          </Typography>
        </ErrorMessageStyle>
      )}
    </Stack>
  );
}
