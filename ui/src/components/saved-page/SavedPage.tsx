import * as React from "react";
import { useEffect } from "react";
// Context
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
// MUI
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
// Components
import Pet from "../dashboard/main/Pet";
// Types
import PetType from "../../types/petType";
// Services
import petsService from "../../services/petsService";
// Interfaces
import { IAuthContext } from "../../interfaces/contextInterfaces";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function SavedPage() {
  const [savedpets, setSavedPets] = React.useState<PetType[]>([]);

  const authContext = useContext<IAuthContext>(AuthContext);

  // useEffect(() => {
  //   const getPets = async () => {
  //     const userSavedPetIds = authContext.getUser()!.savedPets;

  //     setSavedPets();
  //   };
  //   getPets();
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h3" gutterBottom component="div">
        Your saved pets
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={{ xs: 2, md: 3 }}
      >
        {savedpets &&
          savedpets.map((pet) => {
            return (
              <Grid item xs={2} sm={4} m={4} key={pet._id}>
                {/* <Pet pet={pet} /> */}
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
