import { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function Sidebar({ logout }) {
  const [jobsOpen, setJobsOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white flex flex-col py-8">
      <List component="nav" sx={{ color: "white" }}>
        {/* Dashboard */}
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Jobs */}
        <ListItemButton onClick={() => setJobsOpen(!jobsOpen)}>
          <ListItemIcon>
            <WorkIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
          {jobsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={jobsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/add-job" sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Add Job" />
            </ListItemButton>
            <ListItemButton component={Link} to="/jobs" sx={{ pl: 4 }}>
              <ListItemIcon>
                <ListAltIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Jobs List" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Logout */}
        <ListItemButton
          sx={{
            mt: "auto",
            bgcolor: "error.main",
            color: "white",
            "&:hover": { bgcolor: "error.dark" },
          }}
          onClick={logout}
        >
          <ListItemIcon>
            <ExitToAppIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );
}
