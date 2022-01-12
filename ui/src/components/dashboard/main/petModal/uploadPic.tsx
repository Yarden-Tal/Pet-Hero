import * as React from "react";
import { ChangeEvent } from "react";
// MUI
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// Interfaces
import { IUploadPicProps } from "../../../../interfaces/componentInterfaces";

const Input = styled("input")({
  display: "none",
});

const UploadPic = (props: IUploadPicProps): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files as FileList;
    props.setPictureFile(files[0]);
    alert("File uploaded");
  };

  return (
    <span>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <Input
            onChange={handleChange}
            accept="image/*"
            id="contained-button-file"
            type="file"
            required={true}
          />
          <Button variant="contained" component="span">
            Upload Image *
          </Button>
        </label>
      </Stack>
    </span>
  );
};

export default UploadPic;
