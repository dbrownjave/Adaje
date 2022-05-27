import * as React from "react";
import { useState, useEffect, Children } from "react";
// axios
const axios = require("axios");
var bytes = require("bytes");
//iconify
import { Icon, InlineIcon } from "@iconify/react";
//@mui
import {
  Box,
  Typography,
  Container,
  Stack,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import FileUploader from "../components/FileUploader/FileUploader";
import { CustomFile } from "../types/CustomFile";

import Alert from "@mui/material/Alert";

export default function FileUploadPage() {
  const [files, setFiles] = useState<Array<CustomFile> | []>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

  // Handlers

  const handleLocalFileUpload = (file: CustomFile) => {
    // add new file to list
    setFiles([...files, file]);
  };

  const handleFileRemoval = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleFileUpload = async () => {
    // generate form data
    let formData = new FormData();
    files.forEach((file) => {
      // add file data to form data
      formData.append(file.name, file, file.name);
    });

    // saving files to database
    try {
      const res = await axios.post("/api/files", formData);
      const data = res.data;
      setFiles([]); // clear file list
      setOpenSuccessAlert(true);
      setSuccessMessage(data.message);
    } catch (err) {
      // implement error handler and server logging
      console.log("Error uploading file", err);
      console.log(err);
    }
  };

  // Effects
  useEffect(() => {}, [files]);

  const FileItems = (
    <Stack spacing={1}>
      {Children.toArray(
        files.map((file) => (
          <Stack
            key={file.path}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ py: 1, px: 1, background: "#F5F5F7", borderRadius: "8px" }}
          >
            <Stack direction='row' alignItems='center' spacing={1}>
              <Icon
                icon='bi:file-earmark-pdf'
                width='35'
                height='33'
                style={{ opacity: "70%" }}
              />
              <Stack>
                <Typography variant='subtitle2'>{file.path}</Typography>
                <Typography variant='caption'>
                  {" "}
                  {bytes.format(file.size)}
                </Typography>
              </Stack>
            </Stack>
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                handleFileRemoval(file.name);
              }}
            >
              <Icon
                icon='ep:close-bold'
                width='20'
                height='20'
                style={{ opacity: "45%" }}
              />
            </IconButton>
          </Stack>
        ))
      )}
    </Stack>
  );

  // View
  return (
    <Box sx={{ background: "#F5F5F7", height: "100vh" }}>
      <Container>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ height: "100vh" }}
        >
          <Grid item xs={5}>
            <Stack
              spacing={3}
              sx={{ bgcolor: "white", py: 4, px: 4, borderRadius: 4 }}
            >
              {openSuccessAlert && files.length < 1 && (
                <Box sx={{ width: "100%" }}>
                  <Alert
                    action={
                      <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => {
                          setOpenSuccessAlert(false);
                        }}
                      >
                        <Icon
                          icon='ep:close-bold'
                          width='20'
                          height='20'
                          style={{ opacity: "70%" }}
                        />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {successMessage}
                  </Alert>
                </Box>
              )}
              <Typography variant='h5'>
                <b>File Uploader </b>
              </Typography>
              <FileUploader onUpload={handleLocalFileUpload}></FileUploader>
              {FileItems}
              {files.length > 0 && (
                <Button
                  variant='contained'
                  sx={{ width: "100%" }}
                  onClick={handleFileUpload}
                >
                  Save
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
