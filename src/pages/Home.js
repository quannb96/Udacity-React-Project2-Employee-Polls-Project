import React from "react";
import { useSelector } from "react-redux";
import { authUserState } from "../reducers/authedSlice";
import { selectPollState } from "../reducers/pollSlice";
import { selectUserState } from "../reducers/userSlice";
import Loading from "./Loading";
import QuestionList from "../components/QuestionList";
import { Box, Typography } from "@mui/material";

const Home = ({ isLoading }) => {
  const authUser = useSelector(authUserState);

  const answeredQuestionIds = authUser ? Object.keys(authUser.answers) : [];
  const poll = useSelector(selectPollState);
  const user = useSelector(selectUserState);

  const newQuestionFilter = (answeredQuestionIds) => (id) =>
    !answeredQuestionIds.includes(id);
  const answeredQuestionFilter = (answeredQuestionIds) => (id) =>
    answeredQuestionIds.includes(id);

  const newQuestionIds = poll.questions.allIds.filter(
    newQuestionFilter(answeredQuestionIds)
  );

  const newQuestionsWithAuthors = newQuestionIds.map((id) => {
    const question = poll.questions.byId[id];

    return {
      ...question,
      authorObject: user.users.byId[question.author],
    };
  });

  const ansQuestionIds = poll.questions.allIds.filter(
    answeredQuestionFilter(answeredQuestionIds)
  );

  const answeredQuestionsWithAuthors = ansQuestionIds.map((id) => {
    const question = poll.questions.byId[id];

    return {
      ...question,
      authorObject: user.users.byId[question.author],
    };
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box sx={{ m: 2 }}>
      <Box component="section" sx={{ p: 2, mb: 4, border: "1px dashed grey" }}>
        <Typography variant="h5">New Questions</Typography>
        <QuestionList questions={newQuestionsWithAuthors} />
      </Box>
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <Typography variant="h5">Done</Typography>
        <QuestionList questions={answeredQuestionsWithAuthors} />
      </Box>
    </Box>
  );
};

export default Home;
