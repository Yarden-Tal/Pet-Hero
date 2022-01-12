import * as React from "react";
import { SetStateAction, useState } from "react";
// Components
import AdvancedSearchModal from "../dashboard/header/advanced-search/AdvancedSearch";
// MUI
import { IconButton, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
// Interfaces
import { ISearchBarProps } from "../../interfaces/componentInterfaces";
// Service
import petsService from "../../services/petsService";
// Types
import PetType from "../../types/petType";

const SearchBar = ({
  petsList,
  setShowClearBtn,
  showAdvSearch,
  handleChange,
  setPetsList,
}: ISearchBarProps): JSX.Element => {
  const [simpleSearch, setSimpleSearch] = useState<string>("");

  const handleSimpleSearchChange = (e: {
    target: { value: SetStateAction<string> };
  }): void => {
    const searchTerm = e.target.value;
    setSimpleSearch(e.target.value);
    // @ts-ignore
    if (simpleSearch.length > 0) handleSimpleSearch(searchTerm);
    setShowClearBtn(true);
  };

  const handleSimpleSearch = async (simpleSearch: string): Promise<void> => {
    const resPetsList: PetType[] = await petsService.getPets();
    const searchTermReg = new RegExp(simpleSearch, "gmi");
    const results: PetType[] = [...resPetsList].filter((pet) => {
      return searchTermReg.test(pet.name);
    });
    setPetsList([...results]);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleSimpleSearchChange}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ ml: 0.5 }}
      >
        {showAdvSearch && (
          <AdvancedSearchModal
            {...{ setPetsList, showAdvSearch, setShowClearBtn, petsList }}
          />
        )}
      </IconButton>
    </Search>
  );
};

export default SearchBar;

// MUI Styles

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
