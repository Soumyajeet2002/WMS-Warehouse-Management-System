import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const avatarLetter = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#0A0A0A",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "70px !important",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Page title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Dashboard
        </Typography>

        {/* Right side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* Notifications */}
          <IconButton
            sx={{
              color: "text.secondary",
            }}
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{
              width: 36,
              height: 36,
              ml: 1,
              backgroundColor: "#2A2A2A",
              color: "#FFFFFF",
              fontSize: 14,
            }}
          >
            {avatarLetter}
          </Avatar>

          {/* User information */}
          <Box sx={{ ml: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
              }}
            >
              {user?.role || "User"}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                maxWidth: 220,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.email || "Unknown user"}
            </Typography>
          </Box>

          {/* Logout */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            sx={{
              ml: 2,
              borderColor: "divider",
              color: "text.secondary",
              "&:hover": {
                borderColor: "text.primary",
                color: "text.primary",
                backgroundColor: "#151515",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
