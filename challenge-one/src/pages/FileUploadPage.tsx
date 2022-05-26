import * as React from "react";
import { useState } from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
//type

import {
  Box,
  Typography,
  Container,
  Stack,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import FileUploader from "../components/file-uploader/FileUploader";

const FileItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FileUploadPage() {
  const checkError = false;

  const [files, setFiles] = useState([]);
  // Handlers

  const handleFileUpload = () => {};

  return (
    <Box sx={{ background: "#F5F5F7", height: "100vh" }}>
      <Container>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ height: "50vh" }}
        >
          <Grid item xs={6}>
            <Stack
              spacing={3}
              sx={{ bgcolor: "white", py: 4, px: 4, borderRadius: 4 }}
            >
              <Typography variant='h5'>
                <b>File Uploader </b>
              </Typography>
              <FileUploader files={files} />
            </Stack>

            {/* 
            <Controller
            name="pdfFileURL",>

            </Controller> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
