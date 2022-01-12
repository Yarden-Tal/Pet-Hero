import * as React from "react";
import { ChangeEvent, SetStateAction, useState } from "react";
import Swal from "sweetalert2";
// MUI
import { useTheme, styled } from "@mui/material/styles";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiButton from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import { Slider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
// Label data
import labels from "../../../../meta/labels";
// Service
import petsService from "../../../../services/petsService";
// Interfaces
import {
  ILabelType,
  ISearchParams,
  IPopperComponentProps,
  IAdvSearchProps,
} from "../../../../interfaces/componentInterfaces";
// Types
import PetType from "../../../../types/petType";
// Gui
import SearchBar from "../../../gui/search";

const AdvancedSearchModal = (props: IAdvSearchProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Tooltip title="Advanced search">
        <FilterListRoundedIcon onClick={handleOpen} />
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AdvancedSearchForm
            {...{ ...props, handleCloseModal: handleClose }}
          />
        </Box>
      </Modal>
    </>
  );
};

const AdvancedSearchForm = (props: IAdvSearchProps): JSX.Element => {
  // States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<ILabelType[]>([]);
  const [pendingValue, setPendingValue] = useState<ILabelType[]>([]);
  const [weightValue, setWeightValue] = useState<number[]>([20, 37]);
  const [heightValue, setHeightValue] = useState<number[]>([20, 37]);
  const [searchNameValue, setSearchNameValue] = useState<string>("");
  //  Functions
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const valuetext = (value: number): string => {
    return `${value}`;
  };

  const handleWeightChange = (e: Event, newValue: number | number[]): void => {
    setWeightValue(newValue as number[]);
  };

  const handleHeightChange = (e: Event, newValue: number | number[]): void => {
    setHeightValue(newValue as number[]);
  };

  const handleClose = (): void => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleChange = (e: {
    target: { value: SetStateAction<string> };
  }): void => setSearchNameValue(e.target.value);

  const handleSearch = async (): Promise<void> => {
    const params: ISearchParams = {
      type: "",
      name: searchNameValue,
      adoptionStatus: "",
      height: [...heightValue],
      weight: [...weightValue],
    };
    if (
      value.length > 0 ||
      params.height[0] !== 0 ||
      params.weight[0] !== 0 ||
      params.height[1] !== 100 ||
      params.weight[1] !== 100
    )
      params.search = true;
    value.forEach((value) => {
      // @ts-ignore
      if (params[value.dbName])
        // @ts-ignore
        params[value.dbName] += "," + value.value;
      // @ts-ignore
      else params[value.dbName] = value.value;
    });
    const pets: PetType[] = await petsService.getPets(params);
    if (pets.length === 0) {
      Swal.fire(
        "Search again?",
        "Try to broaden your search. Nothing found!",
        "question"
      );
      props.handleCloseModal!();
      return;
    }
    props.setPetsList(pets);
    props.setShowClearBtn(true);
    props.handleCloseModal!();
  };

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  // JSX
  return (
    <>
      <Box sx={{ width: 221, fontSize: 13 }}>
        <Button disableRipple aria-describedby={id} onClick={handleClick}>
          <span style={{ fontSize: 20 }}>Advanced search</span>
          <Tooltip title="Search labels">
            <SettingsIcon />
          </Tooltip>
        </Button>
        {value.map((label) => (
          <Box
            key={label.name}
            sx={{
              mt: "3px",
              height: 20,
              padding: ".15em 4px",
              fontWeight: 600,
              lineHeight: "15px",
              borderRadius: "2px",
            }}
            style={{
              backgroundColor: label.color,
              color: theme.palette.getContrastText(label.color),
            }}
          >
            {label.name}
          </Box>
        ))}
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Box
              sx={{
                borderBottom: `1px solid ${
                  theme.palette.mode === "light" ? "#eaecef" : "#30363d"
                }`,
                padding: "8px 10px",
                fontWeight: 600,
              }}
            >
              Apply labels to your pet search
            </Box>
            <Autocomplete
              open
              multiple
              onClose={(
                e: ChangeEvent<{}>,
                reason: AutocompleteCloseReason
              ) => {
                if (reason === "escape") {
                  handleClose();
                }
              }}
              value={pendingValue}
              onChange={(event, newValue, reason) => {
                if (
                  event.type === "keydown" &&
                  (event as React.KeyboardEvent).key === "Backspace" &&
                  reason === "removeOption"
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={PopperComponent}
              renderTags={() => null}
              noOptionsText="No labels"
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Box
                    component={DoneIcon}
                    sx={{ width: 17, height: 17, mr: "5px", ml: "-2px" }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                  <Box
                    component="span"
                    sx={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      borderRadius: "3px",
                      mr: 1,
                      mt: "2px",
                    }}
                    style={{ backgroundColor: option.color }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      "& span": {
                        color:
                          theme.palette.mode === "light"
                            ? "#586069"
                            : "#8b949e",
                      },
                    }}
                  >
                    {option.name}
                    <br />
                    <span>{option.description}</span>
                  </Box>
                  <Box
                    component={CloseIcon}
                    sx={{ opacity: 0.6, width: 18, height: 18 }}
                    style={{
                      visibility: selected ? "visible" : "hidden",
                    }}
                  />
                </li>
              )}
              options={[...labels].sort((a, b) => {
                // Display the selected labels first.
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder="Filter labels"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
      <Typography sx={{ mt: 2 }} variant="h5" gutterBottom component="div">
        Weight (lbs):
      </Typography>
      <Slider
        getAriaLabel={() => "Weight range"}
        value={weightValue}
        onChange={handleWeightChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <Typography variant="h5" gutterBottom component="div">
        Height (inch):
      </Typography>
      <Slider
        getAriaLabel={() => "Height range"}
        value={heightValue}
        onChange={handleHeightChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <Typography sx={{ mt: 2 }} variant="h5" gutterBottom component="div">
        Name
      </Typography>
      <SearchBar {...{ ...props, handleChange }} />
      <MuiButton variant="contained" color="success" onClick={handleSearch}>
        Apply
      </MuiButton>
    </>
  );
};

// MUI styles and functions

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === "light" ? " #eaecef" : "#30363d"
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));

function PopperComponent(props: IPopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette.mode === "light" ? "#e1e4e8" : "#30363d"}`,
  boxShadow: `0 8px 24px ${
    theme.palette.mode === "light" ? "rgba(149, 157, 165, 0.2)" : "rgb(1, 4, 9)"
  }`,
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.mode === "light" ? "#24292e" : "#c9d1d9",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: `1px solid ${
    theme.palette.mode === "light" ? "#eaecef" : "#30363d"
  }`,
  "& input": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#0d1117",
    padding: 8,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: `1px solid ${
      theme.palette.mode === "light" ? "#eaecef" : "#30363d"
    }`,
    fontSize: 14,
    "&:focus": {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === "light"
          ? "rgba(3, 102, 214, 0.3)"
          : "rgb(12, 45, 107)"
      }`,
      borderColor: theme.palette.mode === "light" ? "#0366d6" : "#388bfd",
    },
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: "100%",
  textAlign: "left",
  paddingBottom: 8,
  color: theme.palette.mode === "light" ? "#586069" : "#8b949e",
  fontWeight: 600,
  "&:hover,&:focus": {
    color: theme.palette.mode === "light" ? "#0366d6" : "#58a6ff",
  },
  "& span": {
    width: "100%",
  },
  "& svg": {
    width: 16,
    height: 16,
  },
}));

export default AdvancedSearchModal;
