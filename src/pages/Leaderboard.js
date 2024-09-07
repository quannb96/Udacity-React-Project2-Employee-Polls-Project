import React from "react";
import { useSelector } from "react-redux";
import { selectLeaderboard, selectUserState } from "../reducers/userSlice";
import Loading from "./Loading";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Leaderboard = () => {
  const leaders = useSelector(selectLeaderboard);
  const { status } = useSelector(selectUserState);

  if (status === "waiting") {
    return <Loading />;
  }

  return (
    <Container maxWidth="md">
      <h1>Leaderboard</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Answered</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaders.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <span>{user.name}</span>
                  <br />
                  {user.id}
                </TableCell>
                <TableCell>{Object.keys(user.answers).length}</TableCell>
                <TableCell>{user.questions.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Leaderboard;
