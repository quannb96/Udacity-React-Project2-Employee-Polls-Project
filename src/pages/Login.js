import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, handleLogin } from "../reducers/authedSlice";
import { useState } from "react";
import { TextField, Typography, Box, Button, Grid } from "@mui/material";

const Login = () => {
  const auth = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("sarahedo");
  const [password, setPassword] = useState("password123");

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof username !== "string" || typeof password !== "string") {
      return;
    }
    dispatch(handleLogin({ username, password }));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="App">
      <Typography variant="h2" sx={{ m: 2 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ m: 2 }} width={400}>
            <TextField
              label="User"
              variant="outlined"
              value={username}
              onChange={handleUsername}
              id="username"
              name="username"
              placeholder="User"
              autoComplete="username"
              autoFocus
              required
              fullWidth
              inputProps={{ "data-testid": "user-input" }}
            />
          </Box>
          <Box sx={{ m: 2 }} width={400}>
            <TextField
              label="Password"
              value={password}
              onChange={handlePassword}
              required
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              fullWidth
              inputProps={{ "data-testid": "password-input" }}
            />
          </Box>
        </Grid>

        {auth.status === "failed" && (
          <p>The authentication was not successful.</p>
        )}
        <Button type="submit" variant="contained" data-testid="login-button">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
