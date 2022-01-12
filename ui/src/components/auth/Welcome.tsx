import * as React from "react";
// React Router
import { Link } from "react-router-dom";
// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import MUILink from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PetsIcon from "@mui/icons-material/Pets";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Copyright = (props: any): JSX.Element => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MUILink color="inherit" href="https://mui.com/">
        Pet Hero
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

const Welcome = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://placedog.net/640/480?random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}
            >
              <PetsIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4">
              Ready to make
              <br /> a new friend?
            </Typography>
            <Box
              sx={{
                width: "100%",
                maxWidth: 500,
                textAlign: "center",
                mt: 1,
                mb: 2,
              }}
            >
              <Typography variant="body1" gutterBottom>
                Be the hero of a new friend, today.
                <br />
                We have the best available pets
                <br />
                for you to adopt or foster.
              </Typography>
              <Button
                size="large"
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, p: 2 }}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  to="/login"
                >
                  Get started
                </Link>
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Welcome;
