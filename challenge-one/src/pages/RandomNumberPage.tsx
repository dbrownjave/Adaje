import * as React from "react";
import { useState, useEffect, useRef, Children } from "react";
//axios
import axios from "axios";
//@mui
import { Box, Typography, Container, Stack, Grid, Button } from "@mui/material";

export default function RandomNumberPage() {
  // States
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [buttonColor, setButtonColor] = useState<string>("gray");
  const [buttonColorList, setButtonColorList] = useState<Array<string> | []>(
    []
  );

  // Props
  const throttling = useRef<boolean>(false);

  // Methods
  const fetchRandomNumber = async () => {
    // Check if thottle is current
    if (throttling.current) return;
    throttling.current = true;
    setTimeout(async () => {
      throttling.current = false;
      try {
        const res = await axios.get("/api/numbers");
        const data = res.data;
        const number = data.number;

        setRandomNumber(number);
      } catch (err) {
        // handle error gracefully
        console.log("Error fetching number", err);
        console.error(err);
      }
    }, 800);
  };

  // Effects

  // renders once upon initialization
  useEffect(() => {
    fetchRandomNumber();
  }, []);

  useEffect(() => {}, [buttonColor]);

  useEffect(() => {
    // prevents inital fetching
    if (randomNumber === 0) return;

    //check if the number is even
    if (randomNumber % 2 == 0) {
      console.log(`${randomNumber} is even.`);
      // fetch random number
      fetchRandomNumber();
    } else {
      const generatedButtonColor =
        randomNumber < 1
          ? "gray"
          : randomNumber <= 300
          ? "green"
          : randomNumber <= 600
          ? "red"
          : randomNumber <= 900
          ? "blue"
          : "gray";
      setButtonColor(generatedButtonColor);
      setButtonColorList([...buttonColorList, generatedButtonColor]);
      console.log(`${randomNumber} is odd.`);
    }
  }, [randomNumber]);

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
              <Stack alignItems='center' spacing={2}>
                <Typography variant='h3'>
                  <b> {randomNumber === 0 ? "--" : `${randomNumber}`}</b>
                </Typography>
                <Button
                  variant='contained'
                  sx={{
                    width: "50%",
                    backgroundColor: `${buttonColor} !important`,
                  }}
                  onClick={fetchRandomNumber}
                >
                  Fetch Number
                </Button>
              </Stack>
              {buttonColorList.length > 0 && (
                <Stack spacing={1}>
                  <Typography>
                    <b>Color History</b>
                  </Typography>
                  <Stack spacing={0}>
                    {Children.toArray(
                      buttonColorList.map((color) => {
                        return (
                          <Typography variant='caption'>{color}</Typography>
                        );
                      })
                    )}
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
