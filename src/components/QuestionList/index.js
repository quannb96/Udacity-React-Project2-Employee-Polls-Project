import { Box, Grid } from "@mui/material";
import Card from "./Card";

const QuestionList = ({ questions }) => {
  return (
    <Grid container spacing={2}>
      {questions.length ? (
        questions.map((question) => (
          <Grid key={question.id} item xs={4}>
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              <Card question={question} />
            </Box>
          </Grid>
        ))
      ) : (
        <li>
          <p>No questions to see here...</p>
        </li>
      )}
    </Grid>
  );
};

export default QuestionList;
