import * as React from "react";
//iconify
import { Icon, InlineIcon } from "@iconify/react";

// type
import { UploadFileProps } from "./type";

import { useDropzone } from "react-dropzone";

// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, Button, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "transparent",
  border: `2px dashed ${theme.palette.divider}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

export default function FileUploader({
  onUpload,
  onRemove,
  onRemoveAll,
  ...other
}: UploadFileProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      // Disable click and keydown behavior
      noClick: true,
      noKeyboard: true,
      ...other,
    });

  return (
    <Stack sx={{}}>
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
        <input {...getInputProps()} />
        <Stack alignItems='center'>
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
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
                <Button variant='contained'>Browse Files</Button>
                <Typography variant='caption' color='text.secondary'>
                  Maximum Size: 10MB
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </DropZoneStyle>
    </Stack>
  );
}

//  <Typography
//    variant='caption'
//    sx={{
//      mt: 2,
//      mx: "auto",
//      display: "block",
//      textAlign: "center",
//      color: "text.secondary",
//    }}
//  >
//    Allowed *.jpeg, *.jpg, *.png, *.gif
//    <br /> max size of {fData(3145728)}
//  </Typography>;
