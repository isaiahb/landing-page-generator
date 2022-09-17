import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import React from "react";
import MenuIcon from "@mui/icons-material/Menu"
// import Caspr from "../assets/caspr-logo.svg";

export default function Header(props: { pages: string[], title: string }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      style={{ backgroundColor: "black" }}
    >
      <Box>
        <Toolbar>
          {/* <img src={Caspr} alt="Caspr" style={{ height: "30px" }}  /> */}
          <Typography fontWeight={600} fontSize={26} paddingLeft="10px">
            {props.title}
          </Typography>

          {/* Display Menu Bar when page is small. */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none", justifyContent: "right" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {props.pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Display pages list when site is larger. */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex", justifyContent: "right" },
            }}
          >
            {props.pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
