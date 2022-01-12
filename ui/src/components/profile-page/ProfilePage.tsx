import * as React from "react";
import { FormEvent, useContext } from "react";
// SWAL
import Swal from "sweetalert2";
// Context
import { AuthContext } from "../../context/authContext";
// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Service
import usersService from "../../services/usersService";
// Interfaces
import { IAuthContext } from "../../interfaces/contextInterfaces";
// Alerts
import { editUserAlert, editUserErr } from "../gui/alerts";

const theme = createTheme();

const SignIn = (): JSX.Element => {
  const authContext = useContext<IAuthContext>(AuthContext);
  const userId: string = authContext.getUser()!._id!;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    const params = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      passwordVerify: data.get("passwordVerify") as string,
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      phone: data.get("phone") as unknown as number,
    };
    Swal.fire(editUserAlert).then(async (result) => {
      if (result.isConfirmed) {
        if (params.password !== params.passwordVerify) {
          Swal.fire(editUserErr);
          return;
        }
        await usersService.updateUser(params, userId);
        authContext.logout();
      }
    });
  };

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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Wish to change your details?
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordVerify"
                label="Verify Password"
                type="password"
                id="passwordVerify"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                id="firstName"
                autoComplete="first-name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                id="lastName"
                autoComplete="last-name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone number"
                id="phone"
                autoComplete="Phone"
              />
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                OK
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignIn;
