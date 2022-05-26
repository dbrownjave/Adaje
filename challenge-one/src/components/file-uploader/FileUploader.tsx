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
const MAX_FILE_SIZE = 10;

export default function FileUploader({
  onUpload,
  onRemove,
  onRemoveAll,
  ...other
}: UploadFileProps) {
  // Props
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    maxSize: Math.pow(MAX_FILE_SIZE, 6),
    onDrop(acceptedFiles, fileRejections, _) {
      setError(false);

      // check for errors
      fileRejections.forEach((file) => {
        file.errors.forEach((err) => {
          switch (err.code) {
            case "file-too-large":
              setError(true);
              console.log(err.message);
              break;
            case "file-invalid-type":
              setError(true);
              console.log(err.message);
              break;
          }
        });

        // return accepted files
        console.log(acceptedFiles);
      });
    },
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    ...other,
  });

  // States
  const [error, setError] = useState(false); // set null

  // Effects
  useEffect(() => {
    console.log("accepted files", acceptedFiles);
  }, [acceptedFiles]);

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
