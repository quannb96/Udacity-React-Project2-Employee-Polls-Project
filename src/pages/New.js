import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";
import { authUserState } from "../reducers/authedSlice";
import { selectPollState, storeQuestionAsync } from "../reducers/pollSlice";
import { Box, Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";

const New = () => {
  const dispatch = useDispatch();
  const authUser = useSelector(authUserState);
  const poll = useSelector(selectPollState);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    optionOneText: "",
    optionTwoText: "",
  });
  const [missingFields, setMissingFields] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { optionOneText, optionTwoText } = formData;

    if (!optionOneText.trim() || !optionTwoText.trim()) {
      setMissingFields(true);
      return;
    }

    setMissingFields(false);

    dispatch(
      storeQuestionAsync({
        author: authUser.id,
        optionOneText,
        optionTwoText,
      })
    ).then(() => {
      navigate(generatePath("/"));
    });
  };

  return (
    <div>
      <h1>Would you rather</h1>
      <p>Create your own poll</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ m: 2 }} width={400}>
            <TextField
              label="First Option"
              variant="outlined"
              type="text"
              name="optionOneText"
              value={formData.optionOneText}
              onChange={handleChange}
              placeholder="Option one"
              required
              fullWidth
            />
          </Box>

          <Box sx={{ m: 2 }} width={400}>
            <TextField
              label="Second Option"
              variant="outlined"
              type="text"
              name="optionTwoText"
              value={formData.optionTwoText}
              onChange={handleChange}
              placeholder="Option two"
              required
              fullWidth
            />
          </Box>

          {poll.status === "failed" && <p>The question was not created.</p>}
          {missingFields && <p>All fields are required.</p>}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default New;
