import * as React from "react";
import { useEffect } from "react";
// Components
import Pet from "./Pet";
// Services
import petsService from "../../../services/petsService";
import { IDashboardProps } from "../../../interfaces/componentInterfaces";
// Types
import PetType from "../../../types/petType";

const Dashboard = ({
  petsList,
  setPetsList,
  setLoading,
}: IDashboardProps): JSX.Element => {
  useEffect(() => {
    const getPets = async (): Promise<void> => {
      const resPetsList: PetType[] = await petsService.getPets();
      setPetsList(resPetsList);
    };
    getPets();
  }, []);

  return (
    <div
      style={{
        padding: "1.5em",
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        gap: "1em",
        justifyContent: "center",
      }}
    >
      {petsList &&
        petsList.map((pet) => {
          return (
            <div key={pet._id} style={{ flexBasis: "30%" }}>
              <Pet {...{ pet, petsList, setPetsList, setLoading }} />
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
