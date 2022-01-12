// React
import * as React from "react";
import { useRef } from "react";
// React Router
import { Link, useLocation } from "react-router-dom";
// MUI
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import Paper from "@mui/material/Paper";
// Interfaces
import { IBottomNavLinkConfig } from "../../interfaces/componentInterfaces";
// Enums
import { contentLinksEnum } from "../../enums";

const useGetCurrentSection = (): contentLinksEnum => {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  let curSection: string = "";
  if (pathParts.length > 1) {
    curSection = pathParts[1];
  }
  return curSection as contentLinksEnum;
};

const bottomNavSections: Record<contentLinksEnum, IBottomNavLinkConfig> = {
  dashboard: { label: "Home", icon: <HomeIcon /> },
  saved: { label: "Wishlist", icon: <FavoriteIcon /> },
  profile: { label: "Profile", icon: <PersonIcon /> },
  contact: { label: "My Pets", icon: <PetsIcon /> },
};

const BottomNav = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const curSection: contentLinksEnum = useGetCurrentSection();
  const curLabel: string = bottomNavSections[curSection]?.label;

  return (
    <footer>
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels value={curLabel}>
            {Object.keys(bottomNavSections).map((section) => {
              const { label, icon } =
                bottomNavSections[section as contentLinksEnum];
              return (
                <BottomNavigationAction
                  key={section}
                  label={label}
                  icon={
                    <Link style={{ color: "#1976D2" }} to={section}>
                      {icon}
                    </Link>
                  }
                />
              );
            })}
          </BottomNavigation>
        </Paper>
      </Box>
    </footer>
  );
};

export default BottomNav;
