import * as React from "react";
import Swal from "sweetalert2";
// Context
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
// MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// Interfaces
import { IPetProps } from "../../../interfaces/componentInterfaces";
import { IAuthContext } from "../../../interfaces/contextInterfaces";
// Components
import AdoptFosterModal from "./AdoptFosterModal";
import EditPetBtn from "./petModal/EditPetBtn";
import PetType from "../../../types/petType";
// Service
import petsService from "../../../services/petsService";
// Alerts
import { editPetAlert } from "../../gui/alerts";

const Pet = ({
  pet,
  petsList,
  setPetsList,
  setLoading,
}: IPetProps): JSX.Element => {
  const authContext = useContext<IAuthContext>(AuthContext);
  const userIsAdmin: boolean = authContext.getUser()!.isAdmin;

  const handleEditPet = async (
    petData: Omit<PetType, "_id">
  ): Promise<void> => {
    let object = {};
    Object.keys(petData).forEach(function (key) {
      //@ts-ignore
      object[key] = petData.get(key);
    });
    await petsService.editPet({ _id: pet._id, petData });
    const resPetsList: PetType[] = await petsService.getPets();
    Swal.fire(editPetAlert);
    setPetsList([...resPetsList]);
  };

  return (
    <Card sx={{ maxWidth: 345, bgcolor: "#e7d3219d" }}>
      <CardMedia
        // style={{ objectFit: "contain" }}
        component="img"
        height="260"
        src={pet.picture}
        alt={`photo of ${pet.name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {" "}
          <span style={{ fontFamily: "Pushster" }}>{pet.name}</span>{" "}
          <span style={{ color: "grey" }}>({pet.breed})</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet.color} {pet.type},{" "}
          <span style={{ color: "orange" }}>{pet.adoptionStatus}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <SaveBtn setLoading={setLoading} petId={pet._id} />
        <AdoptFosterModal {...{ pet, petsList, setPetsList, setLoading }} />
        {userIsAdmin && <EditPetBtn petId={pet._id} onEdit={handleEditPet} />}
      </CardActions>
    </Card>
  );
};

function SaveBtn(props: {
  petId: string;
  setLoading: (isLoading: boolean) => void;
}) {
  const [selected, setSelected] = useState<boolean>(false);
  const authContext = useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    const isSelected = authContext
      .getUser()!
      .savedPets.find((id) => id === props.petId);
    if (isSelected) setSelected(true);
  }, []);

  const handleSave = async (): Promise<void> => {
    // setLoading(true);
    await petsService.savePet(props.petId);
    const user = authContext.getUser();
    if (!user) return;
    user.savedPets.push(props.petId);
    authContext.setUser(user);
    // setLoading(false);
  };

  const handleUnsave = async (): Promise<void> => {
    await petsService.unsavePet(props.petId);
    const user = authContext.getUser();
    if (!user) return;
    user.savedPets = user.savedPets.filter((id) => id !== props.petId);
    authContext.setUser(user);
  };

  return (
    <ToggleButton
      sx={{ border: "none" }}
      value="check"
      selected={selected}
      onChange={() => {
        if (!selected) handleSave();
        else handleUnsave();
        setSelected(!selected);
      }}
    >
      {!selected ? (
        <FavoriteBorderIcon />
      ) : (
        <FavoriteIcon htmlColor="#ed1a1a" />
      )}
    </ToggleButton>
  );
}

export default Pet;
