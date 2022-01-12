import * as React from "react";
// Hooks
import { useState } from "react";
// React Router
import { Routes, Route } from "react-router-dom";
// Types
import PetType from "../types/petType";
// Components
import TopNav from "./dashboard/header/TopNav";
import BottomNav from "./bottom-nav/BottomNav";
// Page-Components
import Dashboard from "./dashboard/main/Dashboard";
import SavedPage from "./saved-page/SavedPage";
import ProfilePage from "./profile-page/ProfilePage";
import ContactPage from "./contact-page/ContactPage";

const AppContent = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [petsList, setPetsList] = useState<PetType[]>([]);

  return (
    <>
      <TopNav {...{ petsList, setPetsList }} />
      <Routes>
        <Route
          path="dashboard"
          element={<Dashboard {...{ petsList, setPetsList, setLoading }} />}
        />
        <Route path="saved" element={<SavedPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="contact" element={<ContactPage />} />
      </Routes>
      <BottomNav />
    </>
  );
};

export default AppContent;
