import * as React from "react";
import { useState, useContext } from "react";
// SWAL
import Swal from "sweetalert2";
// Context
import { AuthContext } from "../../../context/authContext";
// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, Tooltip } from "@mui/material";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
// Components
import UserAvatar from "./UserAvatar";
import LogoutAlert from "./LogoutAlert";
import SearchBar from "../../gui/search";
import AddPetBtn from "../main/petModal/AddPetBtn";
// Types
import PetType from "../../../types/petType";
// Interfaces
import { IAuthContext } from "../../../interfaces/contextInterfaces";
import { IAddPetParams } from "../../../interfaces/serviceInterfaces";
// Service
import petsService from "../../../services/petsService";
// Alerts
import { addPetAlert } from "../../gui/alerts";

const TopNav = (
  {
    setPetsList,
  }: {
    setPetsList: (petsList: PetType[]) => void;
  },
  petsList: PetType[]
): JSX.Element => {
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(true);
  const [searchNameValue, setSearchNameValue] = useState<string>("");

  const authContext = useContext<IAuthContext>(AuthContext);
  const userIsAdmin: boolean = authContext.getUser()!.isAdmin;

  const clearSearch = async (): Promise<void> => {
    const resPetsList = await petsService.getPets();
    setPetsList(resPetsList);
    setShowClearBtn(false);
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }): void => setSearchNameValue(e.target.value);

  const handleAddPet = async (petData: any): Promise<void> => {
    const newPet: PetType = await petsService.addPet(petData as IAddPetParams);
    if (!newPet) return;
    const resPetsList: PetType[] = await petsService.getPets();
    Swal.fire(addPetAlert);
    setPetsList([...resPetsList]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <UserAvatar />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            style={{ fontFamily: "Pushster" }}
          >
            Pet Hero
          </Typography>
          {userIsAdmin && <span style={{ fontFamily: "Pushster" }}>admin</span>}
          {userIsAdmin && <AddPetBtn onAdd={handleAddPet} />}
          {showClearBtn && (
            <Tooltip title="Clear search">
              <div>
                <Button
                  variant="outlined"
                  sx={{ color: "white" }}
                  onClick={clearSearch}
                >
                  <FilterAltOffRoundedIcon />
                </Button>
              </div>
            </Tooltip>
          )}
          {showSearchBar && (
            <SearchBar
              petsList={petsList}
              setPetsList={setPetsList}
              showAdvSearch={true}
              handleChange={handleChange}
              setShowClearBtn={setShowClearBtn}
            />
          )}
          <Tooltip title="Logout">
            <div>
              <LogoutAlert />
            </div>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNav;
