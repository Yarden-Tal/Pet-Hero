import * as React from "react";
import { FC, FormEvent, useEffect, useState } from "react";
// MUI
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Dialog, TextField } from "@mui/material";
// Components
import HypoAllergCheckbox from "./HypoAllergCheckbox";
import DogOrCatSelect from "./DogOrCatSelect";
import AdoptionStatusSelect from "./AdoptionStatusSelect";
import UploadPic from "./uploadPic";
// Services
import petsService from "../../../../services/petsService";
// Enums
import { adoptionStatusEnum, petTypesEnum } from "../../../../enums";
// Interfaces
import { IPetModalProps } from "../../../../interfaces/componentInterfaces";
// Types
import PetType from "../../../../types/petType";

const PetModal: FC<IPetModalProps> = ({
  petId,
  onClose,
  onAction,
}): JSX.Element => {
  // Form States
  const [petTypeSelection, setPetTypeSelection] = useState<petTypesEnum>();
  const [adoptionStatus, setAdoptionStatus] = useState<adoptionStatusEnum>();
  const [pictureFile, setPictureFile] = useState<File>();
  const [checked, setChecked] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const data = new FormData();
    // eslint-disable-next-line no-console
    data.append("type", petTypeSelection!);
    data.append("adoptionStatus", adoptionStatus!);
    data.append("name", e.currentTarget["petName"].value);
    data.append("breed", e.currentTarget["breed"].value);
    data.append("color", e.currentTarget["color"].value);
    data.append(
      "dietaryRestrictions",
      e.currentTarget["dietaryRestrictions"].value
    );
    data.append("weight", e.currentTarget["weight"].value);
    data.append("height", e.currentTarget["height"].value);
    data.append("bio", e.currentTarget["bio"].value);
    data.append("hypoallergenic", checked.toString());
    if (pictureFile) data.append("picture", pictureFile);
    onAction(data);
  };

  const [initialData, setInitialData] = useState<PetType>();
  const [loadingPetData, setLoadingPetData] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (petId) {
        setLoadingPetData(true);
        const petData = await petsService.getPetById(petId);
        setPetTypeSelection(petData.type as petTypesEnum);
        setAdoptionStatus(petData.adoptionStatus as adoptionStatusEnum);
        setChecked(petData.hypoallergenic);
        setInitialData(petData);
        setLoadingPetData(false);
      }
    })();
  }, []);

  return (
    <div>
      <Dialog
        open
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loadingPetData ? (
          <LinearProgress />
        ) : (
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, p: 1.5 }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ fontFamily: "Pushster", textAlign: "center" }}
            >
              <strong>Admin?</strong> Edit this pet
              <br />
              <DogOrCatSelect
                value={petTypeSelection}
                onSelect={setPetTypeSelection}
              />
              <AdoptionStatusSelect
                value={adoptionStatus}
                onSelect={setAdoptionStatus}
              />
            </Typography>
            <TextField
              defaultValue={initialData?.name ?? ""}
              margin="normal"
              required={true}
              fullWidth
              id="name"
              label="Name"
              name="petName"
              autoFocus
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: 5,
              }}
            >
              <TextField
                defaultValue={initialData?.breed}
                margin="normal"
                required={true}
                name="breed"
                label="Breed"
                id="breed"
              />
              <TextField
                defaultValue={initialData?.color}
                margin="normal"
                required={true}
                name="color"
                label="Color"
                id="color"
              />
            </div>
            <TextField
              defaultValue={initialData?.dietaryRestrictions}
              margin="normal"
              required={true}
              fullWidth
              name="dietaryRestrictions"
              label="Dietary Restrictions"
              id="dietaryRestrictions"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: 5,
              }}
            >
              <TextField
                defaultValue={initialData?.weight}
                margin="normal"
                required={true}
                type="number"
                name="weight"
                label="Weight"
                id="weight"
              />
              <TextField
                defaultValue={initialData?.height}
                margin="normal"
                required={true}
                type="number"
                name="height"
                label="Height"
                id="height"
              />
            </div>
            <TextField
              defaultValue={initialData?.bio}
              margin="normal"
              required={true}
              fullWidth
              multiline
              rows={2}
              name="bio"
              label="Bio"
              id="bio"
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <HypoAllergCheckbox checked={checked} onCheck={setChecked} />
              <UploadPic {...{ pictureFile, setPictureFile }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                OK
              </Button>
            </div>
          </Box>
        )}
      </Dialog>
    </div>
  );
};

export default PetModal;
