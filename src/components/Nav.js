import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authUserState, logout } from "../reducers/authedSlice";
import { Avatar, Box, Button } from "@mui/material";

function Nav() {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserState);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/add">New Poll</Link>
      </nav>
      <nav>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Box>
            <Avatar
              alt={authUser?.name}
              src={authUser?.avatarURL || ""}
              sx={{ width: 30, height: 30 }}
            />
          </Box>
          {authUser?.name}
        </Box>
        <Button onClick={handleLogout} variant="outlined" size="small">
          Logout
        </Button>
      </nav>
    </nav>
  );
}

export default Nav;
