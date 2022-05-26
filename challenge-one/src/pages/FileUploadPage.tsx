import * as React from "react";
import {
  Box,
  Typography,
  Container,
  Stack,
  Grid,
  Paper,
  styled,
} from "@mui/material";

const FileItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FileUploadPage() {
  return (
    <Box sx={{ background: "#F5F5F7", height: "100vh" }}>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <Stack sx={{ bgcolor: "white", py: 6, px: 4, borderRadius: 4 }}>
              <Typography variant='h5' component='h1'>
                <b> File Uploader </b>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
