import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import { Menu as MenuIcon, Add } from "@mui/icons-material";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import { Context } from "../../App";
import { signOut } from "../../actions/auth";
import { useDispatch } from "react-redux";

export default function Navbar({ setNewPost, setOpen, open }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, setLoggedIn } = React.useContext(Context);
  const userData = JSON.parse(localStorage.getItem("profile"));
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ justifyContent: "center" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", sm: "block", md: "none" } }}
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          {loggedIn && (
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setNewPost(true)}
            >
              <Add fontSize="large" />
            </IconButton>
          )}
          {!loggedIn ? (
            <Button color="inherit" onClick={() => navigate("/auth")}>
              Login
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {userData?.result?.name[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(signOut(setLoggedIn))}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
