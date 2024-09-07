import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateQuestionStats, getValueForQuestion } from "../utils/utils";
import { selectPollState, storeAnswerAsync } from "../reducers/pollSlice";
import { selectAuthState } from "../reducers/authedSlice";
import { selectUserState } from "../reducers/userSlice";
import Loading from "./Loading";
import { Avatar, Box, Button, Container, Grid } from "@mui/material";

const Poll = ({ isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const poll = useSelector(selectPollState);
  const auth = useSelector(selectAuthState);
  const user = useSelector(selectUserState);
  const { id: questionId } = useParams();

  if (isLoading) {
    return <Loading />;
  }

  if (!poll || !auth || !user) {
    return <Navigate to="/*" />;
  }

  const question = questionId ? poll.questions.byId[questionId] : null;

  const stats = calculateQuestionStats(question);
  const author = user.users.byId[question.author];
  const existingValue = getValueForQuestion(question, auth.userId);
  const hasVotedForOptionOne = existingValue === "optionOne";
  const hasVotedForOptionTwo = existingValue === "optionTwo";
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleVote = (answer) => (e) => {
    e.preventDefault();
    dispatch(
      storeAnswerAsync({
        userId: auth.userId,
        questionId: question.id,
        answer,
      })
    );
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <h1>Poll by {author.name}</h1>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Avatar
            alt={author.name}
            src={author.avatarURL || ""}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
      </Grid>

      <div>
        <h2>Would you rather</h2>
      </div>
      <Container maxWidth="md">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={6} sm={4} md={6}>
            <Box
              onClick={handleVote("optionOne")}
              disabled={hasVoted}
              variant="outlined"
              fullWidth
              sx={{ p: 1, mb: 4, border: "1px dashed grey" }}
            >
              <Box>
                <p>{question.optionOne.text}</p>
                {!hasVoted && (
                  <Button variant="contained" fullWidth>
                    Click
                  </Button>
                )}
                {hasVoted && (
                  <Button variant="contained" fullWidth disabled>
                    Votes: {stats.optionOneVotesCount} (
                    {stats.optionOnePercentage}
                    %)
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4} md={6}>
            <Box
              onClick={handleVote("optionTwo")}
              disabled={hasVoted}
              variant="outlined"
              fullWidth
              sx={{ p: 1, mb: 4, border: "1px dashed grey" }}
            >
              <Box>
                <p>{question.optionTwo.text}</p>
                {!hasVoted && (
                  <Button variant="contained" fullWidth>
                    Click
                  </Button>
                )}
                {hasVoted && (
                  <Button variant="contained" fullWidth disabled>
                    Votes: {stats.optionTwoVotesCount} (
                    {stats.optionTwoPercentage}
                    %)
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Poll;
